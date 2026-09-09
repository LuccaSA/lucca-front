/**
 * Story source code reader — reads Storybook story files via `git show`.
 *
 * Instead of reading from the filesystem (which reflects the current branch),
 * this reads story source code from a specific git tag to ensure
 * the examples match the exact version being documented.
 */

import path from 'path';
import { StorybookGroup, StorybookStory, StoryExample, StoryCollectionResult, VersionConfig } from '../types';
import { renderStoryTemplates, renderBasicStoryTemplate } from './story-eval';
import { listDirsAtTag, readAtTag } from './git-snapshot';

/**
 * Reads story source code for a component from a specific git tag,
 * returning structured StoryExamples and merged input descriptions.
 *
 * @param storybook — Storybook group with story import paths
 * @param version — Version config (for the git tag)
 * @param extraGroups — Additional storybook groups to include
 * @returns Structured result with examples and descriptions, or null
 */
export function readStorySourceFromGit(
	storybook: StorybookGroup | null,
	version: VersionConfig,
	componentDefaults: Map<string, string> = new Map(),
	extraGroups?: StorybookGroup[],
): StoryCollectionResult | null {
	const allGroups = [storybook, ...(extraGroups ?? [])].filter(Boolean) as StorybookGroup[];
	if (allGroups.length === 0) return null;

	const seen = new Set<string>();
	const examples: StoryExample[] = [];
	const inputDescriptions = new Map<string, string>();

	const allStories = allGroups.flatMap((g) => g.stories);

	// Settle every story whose framework the Storybook index could not decide, BEFORE anything
	// derives a file slug or a section from it (index.ts maps ZeroHeight notes onto these same
	// objects, so the resolution has to happen in place and up front).
	resolveStoryFrameworks(allStories, version);

	for (const story of allStories) {
		if (!story.importPath) continue;

		// Security: reject path traversal
		const normalizedImport = story.importPath.replace(/^[./\\]+/, '');
		if (/\.\./.test(normalizedImport)) continue;
		if (seen.has(normalizedImport)) continue;
		seen.add(normalizedImport);

		try {
			const content = gitShowFile(version.tag, normalizedImport);
			if (!content) continue;

			const extracted = extractStoryEssentials(content);
			if (!extracted) continue;

			// Collect input descriptions (deduplicated, first-seen wins)
			for (const { name, description } of extracted.descriptions) {
				if (!inputDescriptions.has(name)) {
					inputDescriptions.set(name, description);
				}
			}

			// Resolve interpolations by evaluating the story's render() at default args.
			// Static extraction can only leave an opaque `${…}` placeholder; only fall back to it
			// when evaluation yields nothing usable, so we never emit worse code than before.
			// Evaluating the story's render() resolves interpolations that static extraction can only
			// leave as `${…}` — and is also the ONLY way to read a computed template such as
			// `template: getTemplate()` where the helper builds the markup at runtime. So it runs both
			// when extraction left placeholders and when it found nothing at all; previously the second
			// case never reached the evaluator.
			let templates = extracted.templates;
			if (templates.length === 0 || templates.some((t) => t.includes('${'))) {
				const rendered = renderStoryTemplates(content, componentDefaults);
				if (rendered && rendered.length > 0) templates = rendered;
			}

			// Last resort: the markup lives in a sibling .html file.
			if (templates.length === 0) {
				templates = readTemplateUrlFile(content, normalizedImport, version.tag);
			}

			// A story with no markup has nothing to show: its section would be a heading over an import
			// block that `<slug>.md` already prints verbatim under `## Import`. It used to be kept as
			// long as it had imports (`&&`), which turned every extraction failure into a code-less
			// example — daterangeinput shipped as 29 lines with no `<lu-date-range-input>` anywhere.
			//
			// This is only safe because extraction now succeeds on the shapes it used to miss (wrapped
			// helper calls, quoted markup, `templateUrl`, computed templates): failures fell from 53 to
			// 12 at v21.3.1. Flipping this without those fixes would have deleted 41 legitimate examples.
			if (templates.length === 0) continue;

			// Derive a file slug from the import path
			const fileSlug = deriveFileSlug(story.importPath, story.framework);
			const displayName = deriveDisplayName(story.importPath);

			examples.push({
				fileSlug,
				name: displayName,
				framework: story.framework,
				importPath: story.importPath,
				imports: extracted.imports,
				templates,
			});
		} catch {
			// File doesn't exist in this tag — skip
		}
	}

	disambiguateNames(examples);

	return examples.length > 0 || inputDescriptions.size > 0
		? { examples, inputDescriptions }
		: null;
}

/**
 * Derives a file slug from a story import path.
 * e.g. "./stories/.../angular/button-basic.stories.ts" → "angular-basic"
 * e.g. "./stories/.../html&css/button-size.stories.ts" → "html-size"
 */
function deriveFileSlug(importPath: string, framework: 'angular' | 'html-css'): string {
	const filename = importPath.split('/').pop() ?? '';
	// Remove component prefix and ".stories.ts" suffix
	const base = filename.replace(/\.stories\.ts$/, '');
	// Remove the component name prefix (e.g. "button-" from "button-basic")
	const parts = base.split('-');
	const suffix = parts.length > 1 ? parts.slice(1).join('-') : parts[0];
	const prefix = framework === 'angular' ? 'angular' : 'html';
	return `${prefix}-${suffix}`;
}

/**
 * Restores the segment `deriveDisplayName` drops, for the stories where dropping it loses the
 * distinction.
 *
 * That heuristic assumes the first hyphen-separated segment is the component prefix, which holds
 * for `button-basic` but not for a component whose stories are split by sub-part:
 * `detail-basic.stories.ts` and `list-basic.stories.ts` both became "Basic", and the page then
 * showed two `### Basic` under one heading with different content and nothing to tell them apart.
 * 83 such collisions on 22.0.
 *
 * Only the colliding names are rewritten — `detail-basic` → "Detail basic" — so every other title
 * keeps the shorter form it has today.
 */
function disambiguateNames(examples: StoryExample[]): void {
	const byKey = new Map<string, StoryExample[]>();
	for (const ex of examples) {
		const key = `${ex.framework}::${ex.name}`;
		const list = byKey.get(key) ?? [];
		list.push(ex);
		byKey.set(key, list);
	}

	for (const list of byKey.values()) {
		if (list.length < 2) continue;

		// Escalate context until the titles differ. The file name alone is not always enough: two
		// stories can share it in different folders — `html&css/basic` and `html&css/group/basic`,
		// or `overlays/popover/popover` and `users/popover/angular/popover`.
		for (let depth = 0; depth <= 2; depth++) {
			const names = list.map((ex) => deriveFullName(ex.importPath, depth));
			if (new Set(names).size === list.length || depth === 2) {
				list.forEach((ex, i) => (ex.name = names[i]));
				break;
			}
		}
	}
}

/** Folder names that carry no meaning in a title. */
const NOISE_SEGMENTS = new Set(['stories', 'documentation', 'angular', 'demo']);

/**
 * Display name keeping every segment of the file name, plus `depth` folder levels of context.
 *
 * `depth` 0 → ".../detail-basic.stories.ts" → "Detail basic"
 * `depth` 1 → ".../html&css/group/basic.stories.ts" → "Group basic"
 * `depth` 2 → ".../overlays/popover/popover.stories.ts" → "Overlays popover"
 *
 * Framework folders are skipped — they are already the section the example sits in — and a folder
 * repeating the file name is dropped rather than yielding "Popover popover".
 */
export function deriveFullName(importPath: string, depth = 0): string {
	const segments = importPath.replace(/^[./\\]+/, '').split('/');
	const base = (segments.pop() ?? '').replace(/\.stories\.ts$/, '');

	// A folder repeating the file name adds nothing ("Popover popover"), so it is skipped rather
	// than kept and deduplicated — otherwise one level of context buys nothing at all.
	const meaningful = segments.filter(
		(s) => !NOISE_SEGMENTS.has(s) && !/^html\s*&\s*css$/i.test(s) && s.toLowerCase() !== base.toLowerCase(),
	);
	const context = depth > 0 ? meaningful.slice(-depth) : [];

	const words = [...context, ...base.split('-')]
		.map((w) => w.trim())
		.filter(Boolean)
		.filter((w, i, all) => i === 0 || w.toLowerCase() !== all[i - 1].toLowerCase());

	const joined = words.join(' ');
	return joined.charAt(0).toUpperCase() + joined.slice(1);
}

/**
 * Derives a display name from a story import path.
 * e.g. "./stories/.../angular/button-basic.stories.ts" → "Basic"
 */
function deriveDisplayName(importPath: string): string {
	const filename = importPath.split('/').pop() ?? '';
	const base = filename.replace(/\.stories\.ts$/, '');
	const parts = base.split('-');
	const suffix = parts.length > 1 ? parts.slice(1).join(' ') : parts[0];
	return suffix.charAt(0).toUpperCase() + suffix.slice(1);
}

/**
 * Reads and returns the HTML templates from a story file at a specific git tag.
 * Used by the tools collector to replace storybook iframe links with actual code.
 *
 * Falls back to `const code = \`` literals when no inline template is found.
 * This handles toolbox stories that use `templateUrl` + a curated `const code` example.
 *
 * @param importPath — e.g. "./stories/documentation/utilities/text-size.stories.ts"
 * @param version — version config (for the git tag)
 * @returns Array of extracted template/code strings, or null if unavailable
 */
export function readStoryTemplates(importPath: string, version: VersionConfig): string[] | null {
	const normalizedImport = importPath.replace(/^[./\\]+/, '');
	if (/\.\./.test(normalizedImport)) return null;

	const content = gitShowFile(version.tag, normalizedImport);
	if (!content) return null;

	// Prefer `const code = \`` documentation literals when present:
	// they are curated examples written by the design team (imports + usage),
	// more complete than the bare inline template used by Storybook.
	const codeLiterals = extractCodeLiterals(content);
	if (codeLiterals.length > 0) return codeLiterals;

	// Fallback: inline template literals (template: `...`)
	const templates = extractTemplateLiterals(content);
	if (templates.length > 0) return templates;

	// Computed templates (`template: getTemplate()`) only exist once the story is evaluated.
	const rendered = renderStoryTemplates(content, new Map());
	if (rendered && rendered.length > 0) return rendered;

	// Last resort: the markup lives in a sibling .html file (templateUrl).
	const fromFile = readTemplateUrlFile(content, normalizedImport, version.tag);
	return fromFile.length > 0 ? fromFile : null;
}

/**
 * Extracts `const code = \`` documentation literals from a story file.
 * These are curated examples (imports + HTML) written by the design team.
 */
function extractCodeLiterals(content: string): string[] {
	const results: string[] = [];
	const pattern = 'const code =';
	let pos = 0;

	while (pos < content.length) {
		const idx = content.indexOf(pattern, pos);
		if (idx === -1) break;

		let i = idx + pattern.length;
		while (i < content.length && (content[i] === ' ' || content[i] === '\n' || content[i] === '\r' || content[i] === '\t')) i++;

		if (content[i] !== '`') {
			pos = idx + pattern.length;
			continue;
		}

		i++;
		const { text, endPos } = readTemplateLiteral(content, i);
		if (text.trim()) results.push(text);
		pos = endPos;
	}

	return results;
}

/**
 * Reads a file from a specific git tag using `git show`.
 * Uses execFileSync to avoid shell interpretation of special chars like `&`.
 */
/**
 * Reads the template of a story that declares `templateUrl: './x.stories.html'` instead of an
 * inline one — 12 stories at v21.3.1 and v22.0.0, which yielded no markup at all.
 *
 * The sibling file is resolved relative to the story and fetched from the same git tag, so the
 * markup matches the documented version like every other source in this pipeline.
 */
function readTemplateUrlFile(content: string, importPath: string, tag: string): string[] {
	const results: string[] = [];
	const seen = new Set<string>();

	for (const match of content.matchAll(/templateUrl:\s*['\"`]([^'\"`]+)['\"`]/g)) {
		const rel = match[1];
		if (/\.\./.test(rel) || rel.startsWith('/')) continue;
		if (seen.has(rel)) continue;
		seen.add(rel);

		const storyDir = path.posix.dirname(importPath.replace(/^[./\\]+/, ''));
		const htmlPath = path.posix.normalize(path.posix.join(storyDir, rel));
		if (htmlPath.startsWith('..')) continue;

		const html = gitShowFile(tag, htmlPath);
		if (html?.trim()) results.push(html.trim());
	}

	return results;
}

/** Per-run cache: `git show` is invoked once per (tag, path) across both passes. */
const gitShowCache = new Map<string, string | null>();

function gitShowFile(tag: string, filePath: string): string | null {
	const key = `${tag}:${filePath}`;
	if (gitShowCache.has(key)) return gitShowCache.get(key)!;
	const content = gitShowFileUncached(tag, filePath);
	gitShowCache.set(key, content);
	return content;
}

function gitShowFileUncached(tag: string, filePath: string): string | null {
	return readAtTag(tag, filePath);
}

/**
 * Angular-only Storybook constructs. A story declaring an Angular module/provider set or a
 * `component:` documents the Angular API.
 *
 * Deliberately NOT a signal: Angular binding syntax in the rendered markup. The repo's own
 * `html&css/` stories use `(click)="…"` and `[attr.style]="…"` in raw HTML (they render inside
 * Storybook Angular), so bindings misclassify 29 of them at v21.3.1. Nor is an import from
 * `@storybook/angular`, which every story has.
 */
const ANGULAR_STORY_CONSTRUCTS = /\bmoduleMetadata\s*\(|\bapplicationConfig\s*\(|\bimportProvidersFrom\s*\(/;
const ANGULAR_STORY_COMPONENT = /^\s*component:\s*[A-Z][\w$]*\s*,?\s*$/m;

/** Tier 3 of the framework decision: read it off the story source. */
export function detectFrameworkFromSource(source: string): 'angular' | 'html-css' {
	if (ANGULAR_STORY_CONSTRUCTS.test(source)) return 'angular';
	if (ANGULAR_STORY_COMPONENT.test(source)) return 'angular';
	return 'html-css';
}

/**
 * Resolves, in place, the framework of every story the Storybook index could not decide from its
 * folder layout or its title (`frameworkConfident: false`).
 *
 * Without this pass those stories all defaulted to `html-css`: at v21.3.1, 164 of 596 stories —
 * 60 of them Angular — which filed Angular examples under `## HTML/CSS` and concatenated their
 * TypeScript imports into the component's SCSS block.
 */
export function resolveStoryFrameworks(stories: StorybookStory[], version: VersionConfig): void {
	const byPath = new Map<string, 'angular' | 'html-css'>();

	for (const story of stories) {
		if (story.frameworkConfident || !story.importPath) continue;

		const normalizedImport = story.importPath.replace(/^[./\\]+/, '');
		if (/\.\./.test(normalizedImport)) continue;

		// Several stories share one file — classify it once.
		let resolved = byPath.get(normalizedImport);
		if (resolved === undefined) {
			const content = gitShowFile(version.tag, normalizedImport);
			if (!content) continue; // absent from this tag — leave the index's default untouched
			resolved = detectFrameworkFromSource(content);
			byPath.set(normalizedImport, resolved);
		}

		story.framework = resolved;
		story.frameworkConfident = true;
	}
}

/** Import lines to exclude from story output. */
const IMPORT_EXCLUDE_PATTERNS = [
	/['"]@storybook\//,          // @storybook/angular, @storybook/test, etc.
	/['"]storybook\//,           // storybook/test, etc.
	/['"]stories\/helpers/,      // shared test helpers
	/\.stories['"]/,             // cross-story imports (e.g., './button-basic.stories')
	// Story helpers reached by a relative path — `'../../../helpers/stories'`,
	// `'../helpers/story-model-display.component'`, `'@/helpers/test'`. The pattern above only
	// matched the `stories/helpers` spelling, so these leaked into the published import block of
	// 17 components at v21.3.1; they are story plumbing, never consumer API.
	/['"][@./][^'"]*\/helpers(\/|['"])/,
	/['"]@\/stories\//,          // alias-rooted story assets (e.g. '@/stories/icons-list')
];

interface StoryExtraction {
	imports: string[];
	templates: string[];
	descriptions: { name: string; description: string }[];
}

/**
 * Extracts essential parts from a Storybook Angular story file:
 * 1. Non-storybook import lines
 * 2. HTML templates from template: `...`
 * 3. argType descriptions (collected separately for API enrichment)
 */
function extractStoryEssentials(content: string): StoryExtraction | null {
	// 1. Imports — filter out storybook-related ones
	const imports = content
		.split('\n')
		.filter((l) => l.trimStart().startsWith('import '))
		.filter((l) => !IMPORT_EXCLUDE_PATTERNS.some((p) => p.test(l)))
		.map((l) => l.trim());

	// 2. HTML templates
	const templates = extractTemplateLiterals(content);

	// 3. argType descriptions
	const descriptions = extractArgTypeDescriptions(content);

	if (imports.length === 0 && templates.length === 0 && descriptions.length === 0) return null;

	return { imports, templates, descriptions };
}

/** A helper call wrapping the template, e.g. `cleanupTemplate(` in `template: cleanupTemplate(`…`)`. */
const CALL_HEAD = /^[A-Za-z_$][\w$.]*\s*\(\s*/;

function skipWhitespace(content: string, pos: number): number {
	let i = pos;
	while (i < content.length && (content[i] === ' ' || content[i] === '\n' || content[i] === '\r' || content[i] === '\t')) i++;
	return i;
}

/**
 * Steps over any helper calls between `template:` / `return` and the literal that follows.
 *
 * `template: cleanupTemplate(`…`)` is the repo's dominant story shape and used to yield nothing:
 * the reader only saw a heading with imports and no markup. Loops, so `a(b(`…`))` works too.
 */
function skipCallHeads(content: string, pos: number): number {
	let i = pos;
	for (;;) {
		const match = CALL_HEAD.exec(content.slice(i, i + 120));
		if (!match) return i;
		i += match[0].length;
	}
}

/** Reads a single-quoted or double-quoted string literal, stopping at the unescaped closing quote. */
function readQuotedString(content: string, startPos: number, quote: string): { text: string; endPos: number } {
	let i = startPos;
	let text = '';
	while (i < content.length) {
		const ch = content[i];
		if (ch === '\\' && i + 1 < content.length) {
			text += content[i + 1];
			i += 2;
		} else if (ch === quote) {
			return { text, endPos: i + 1 };
		} else if (ch === '\n') {
			return { text: '', endPos: i };
		} else {
			text += ch;
			i++;
		}
	}
	return { text, endPos: i };
}

/**
 * Extracts all template values from story files.
 *
 * Looks for `template:` and `return`, then accepts:
 * 1. a template literal — `template: \`...\`` / `return \`...\``;
 * 2. the same wrapped in helper calls — `template: cleanupTemplate(\`...\`)`;
 * 3. a quoted string containing markup — `return '<span class="tag">Text</span>';`.
 *
 * Templates living in a sibling `.html` file (`templateUrl`) are handled separately, by
 * `readTemplateUrlFile()` — the file has to be fetched from git, which needs the tag.
 */
export function extractTemplateLiterals(content: string): string[] {
	const results: string[] = [];
	const patterns = ['template:', 'return'];

	for (const searchStr of patterns) {
		let pos = 0;
		while (pos < content.length) {
			const idx = content.indexOf(searchStr, pos);
			if (idx === -1) break;

			const next = idx + searchStr.length;
			pos = next;

			// `return` must be the keyword, not the head of an identifier like `returnValue`.
			if (searchStr === 'return' && !/\s/.test(content[next] ?? '')) continue;

			const i = skipCallHeads(content, skipWhitespace(content, next));
			const ch = content[i];

			if (ch === '`') {
				const { text, endPos } = readTemplateLiteral(content, i + 1);
				if (text.trim()) results.push(text);
				pos = endPos;
				continue;
			}

			if (ch === "'" || ch === '"') {
				const { text, endPos } = readQuotedString(content, i + 1, ch);
				// Only markup: a story helper returns plenty of strings that are not templates.
				if (text.trim() && text.includes('<')) results.push(text);
				pos = endPos;
			}
		}
	}

	// Deduplicate (same template may match both patterns)
	const seen = new Set<string>();
	return results.filter((t) => {
		const key = t.trim();
		if (seen.has(key)) return false;
		seen.add(key);
		return true;
	}).slice(0, 5);
}

function readTemplateLiteral(content: string, startPos: number): { text: string; endPos: number } {
	let i = startPos;
	let text = '';

	while (i < content.length) {
		const ch = content[i];
		if (ch === '`') {
			return { text, endPos: i + 1 };
		} else if (ch === '\\' && i + 1 < content.length) {
			text += ch + content[i + 1];
			i += 2;
		} else if (ch === '$' && content[i + 1] === '{') {
			i = skipInterpolation(content, i + 2);
			text += '${…}';
		} else {
			text += ch;
			i++;
		}
	}

	return { text, endPos: i };
}

function skipInterpolation(content: string, startPos: number): number {
	let i = startPos;
	let depth = 1;

	while (i < content.length && depth > 0) {
		const ch = content[i];
		if (ch === '\\' && i + 1 < content.length) {
			i += 2;
		} else if (ch === '`') {
			i++;
			const { endPos } = readTemplateLiteral(content, i);
			i = endPos;
		} else if (ch === '{') {
			depth++;
			i++;
		} else if (ch === '}') {
			depth--;
			i++;
		} else {
			i++;
		}
	}

	return i;
}

/**
 * Extracts a minimal "basic usage" HTML template from the basic story of a component.
 *
 * Finds the first story file whose import path contains "basic", extracts the first
 * template literal, then strips Storybook interpolations (`${…}`) to produce
 * a clean, working HTML snippet.
 */
export function extractBasicUsage(
	storybook: StorybookGroup | null,
	version: VersionConfig,
	componentDefaults: Map<string, string> = new Map(),
): string | null {
	if (!storybook) return null;

	// Find the "basic" angular story
	const basicStory = storybook.stories.find(
		(s) => s.framework === 'angular' && s.importPath && /\bbasic\b/i.test(s.importPath)
	);
	if (!basicStory?.importPath) return null;

	const normalizedImport = basicStory.importPath.replace(/^[./\\]+/, '');
	if (/\.\./.test(normalizedImport)) return null;

	try {
		const content = gitShowFile(version.tag, normalizedImport);
		if (!content) return null;

		// Prefer the evaluated render — it produces a real, fully-resolved snippet.
		const rendered = renderBasicStoryTemplate(content, componentDefaults);
		if (rendered) {
			const cleaned = cleanBasicTemplate(rendered);
			if (cleaned) return cleaned;
		}

		// Fallback: static extraction + placeholder stripping.
		const templates = extractTemplateLiterals(content);
		if (templates.length === 0) return null;
		return cleanBasicTemplate(templates[0]);
	} catch {
		return null;
	}
}

/**
 * Cleans a Storybook template into a minimal working HTML snippet:
 * - Strips `${…}` interpolations
 * - Collapses excessive whitespace
 * - Removes empty attributes left behind (e.g. ` ="..."`)
 */
function cleanBasicTemplate(raw: string): string | null {
	let cleaned = raw
		.replace(/\$\{…\}/g, '')           // strip interpolation placeholders
		.replace(/\s+(?==)/g, '')           // fix `attr ="val"` → `attr="val"`
		.replace(/\s*=""\s*/g, ' ')         // remove empty attributes `=""`
		.replace(/\s{2,}/g, ' ')            // collapse multiple spaces
		.replace(/\n\s*\n/g, '\n')          // collapse blank lines
		.trim();

	// If nothing meaningful is left, skip
	if (cleaned.length < 5 || !cleaned.includes('<')) return null;

	return cleaned;
}

function extractArgTypeDescriptions(content: string): { name: string; description: string }[] {
	const results: { name: string; description: string }[] = [];
	const seen = new Set<string>();
	const lines = content.split('\n');

	for (let lineIdx = 0; lineIdx < lines.length; lineIdx++) {
		const line = lines[lineIdx];
		const descMatch = line.match(/^\s+description\s*:\s*(?:'((?:[^'\\]|\\.)*)'|"((?:[^"\\]|\\.)*)")/);
		if (!descMatch) continue;

		const raw = descMatch[1] ?? descMatch[2] ?? '';
		const description = raw
			.replace(/<[^>]+>/g, '')
			.replace(/\\n/g, ' ')
			.trim();
		if (!description) continue;

		const descIndent = (line.match(/^(\s+)/)?.[1] ?? '').length;
		let propName: string | null = null;
		for (let j = lineIdx - 1; j >= 0 && j >= lineIdx - 15; j--) {
			const prev = lines[j];
			const prevIndent = (prev.match(/^(\s+)/)?.[1] ?? '').length;
			if (prevIndent < descIndent) {
				const nameMatch = prev.match(/^\s+(\w+)\s*:\s*\{/);
				if (nameMatch) {
					propName = nameMatch[1];
					break;
				}
			}
		}

		const SKIP = new Set(['type', 'control', 'table', 'if', 'mapping']);
		if (propName && !seen.has(propName) && !SKIP.has(propName)) {
			seen.add(propName);
			const truncated = description.length > 120 ? description.slice(0, 120) + '…' : description;
			results.push({ name: propName, description: truncated });
			if (results.length >= 8) break;
		}
	}

	return results;
}

// ─── SCSS import inference for HTML stories ───────────────────────────────────

/** Cache of SCSS component folder names per git tag. */
const scssComponentsCache = new Map<string, Set<string>>();

/**
 * Reads all SCSS component folder names from a git tag.
 * Returns a Set of camelCase folder names (e.g., "button", "numericBadge", "buttonGroup").
 */
function getScssComponentNames(tag: string): Set<string> {
	const cached = scssComponentsCache.get(tag);
	if (cached) return cached;

	try {
		const names = new Set(
			listDirsAtTag(tag, 'packages/scss/src/components')
				.map((name) => name.trim())
				.filter((n) => n && !n.startsWith('_'))
		);
		scssComponentsCache.set(tag, names);
		return names;
	} catch {
		return new Set();
	}
}

/** Converts kebab-case to camelCase: "button-group" → "buttonGroup" */
function kebabToCamelCase(str: string): string {
	return str.replace(/-([a-z])/g, (_, c: string) => c.toUpperCase());
}

/** Class prefixes that are modifiers/utilities, not component names. */
const IGNORE_CLASS_PREFIXES = ['mod-', 'is-', 'pr-u-', 'palette-', 'u-', 'ng-'];

/**
 * Infers additional SCSS component imports from HTML templates.
 *
 * Scans CSS classes in the HTML, matches them against known SCSS component folders,
 * and returns `@forward` import lines for components OTHER than the main one.
 */
export function inferScssImports(templates: string[], mainNgPackage: string, tag: string): string[] {
	const scssComponents = getScssComponentNames(tag);
	if (scssComponents.size === 0) return [];

	const matchedComponents = new Set<string>();

	for (const tmpl of templates) {
		// Extract all class attribute values
		const classRegex = /class="([^"]*)"/g;
		let m: RegExpExecArray | null;
		while ((m = classRegex.exec(tmpl)) !== null) {
			const classes = m[1].split(/\s+/).filter(Boolean);
			for (const cls of classes) {
				// Skip modifiers and utility classes
				if (IGNORE_CLASS_PREFIXES.some((p) => cls.startsWith(p))) continue;
				// Skip interpolation placeholders
				if (cls.includes('${')) continue;

				// Try exact match (camelCase classes like "numericBadge")
				if (scssComponents.has(cls)) {
					matchedComponents.add(cls);
					continue;
				}
				// Try kebab-to-camel conversion ("button-group" → "buttonGroup")
				const camel = kebabToCamelCase(cls);
				if (camel !== cls && scssComponents.has(camel)) {
					matchedComponents.add(camel);
					continue;
				}
				// Try base class without suffix ("button-group-item" → "buttonGroup")
				const parts = cls.split('-');
				for (let len = parts.length - 1; len >= 2; len--) {
					const prefix = kebabToCamelCase(parts.slice(0, len).join('-'));
					if (scssComponents.has(prefix)) {
						matchedComponents.add(prefix);
						break;
					}
				}
			}
		}
	}

	// Remove the main component itself
	matchedComponents.delete(mainNgPackage);
	// Also try kebab conversion of the main package name
	matchedComponents.delete(kebabToCamelCase(mainNgPackage));

	if (matchedComponents.size === 0) return [];

	return [...matchedComponents]
		.sort()
		.map((name) => `@forward '@lucca-front/scss/src/components/${name}';`);
}

// ─── HTML template formatting ─────────────────────────────────────────────────

const PLACEHOLDER = '__LF_INTERP__';
const PLACEHOLDER_RE = new RegExp(PLACEHOLDER, 'g');

/**
 * Formats all HTML templates in story examples using prettier.
 * Handles `${…}` interpolation placeholders by temporarily replacing them.
 */
export async function formatStoryTemplates(examples: StoryExample[]): Promise<void> {
	const prettier = await import('prettier');

	for (const ex of examples) {
		const formatted: string[] = [];
		for (const tmpl of ex.templates) {
			formatted.push(await formatHtml(prettier, tmpl, ex.framework === 'angular'));
		}
		ex.templates = formatted;
	}
}

async function formatHtml(prettier: typeof import('prettier'), html: string, isAngular: boolean): Promise<string> {
	// Replace ${…} with a safe placeholder
	const escaped = html.replace(/\$\{…\}/g, PLACEHOLDER);

	try {
		const result = await prettier.format(escaped, {
			parser: isAngular ? 'angular' : 'html',
			printWidth: 120,
			useTabs: true,
			tabWidth: 2,
			singleAttributePerLine: false,
			htmlWhitespaceSensitivity: 'ignore',
		});
		return result.replace(PLACEHOLDER_RE, '${…}').trim();
	} catch {
		// Fallback: basic cleanup without prettier
		return basicHtmlCleanup(html);
	}
}

/** Simple fallback formatter when prettier fails. */
function basicHtmlCleanup(html: string): string {
	return html
		.replace(/\n\s*>/g, '>')       // Fix dangling ">" on new line
		.replace(/\n{3,}/g, '\n\n')    // Collapse excessive blank lines
		.trim();
}
