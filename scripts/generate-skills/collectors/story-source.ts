/**
 * Story source code reader — reads Storybook story files via `git show`.
 *
 * Instead of reading from the filesystem (which reflects the current branch),
 * this reads story source code from a specific git tag to ensure
 * the examples match the exact version being documented.
 */

import { execFileSync, execSync } from 'child_process';
import path from 'path';
import { StorybookGroup, StoryExample, StoryCollectionResult, VersionConfig } from '../types';

const WORKSPACE_ROOT = path.join(__dirname, '..', '..', '..');

/**
 * Reads story source code for a component from a specific git tag,
 * returning structured StoryExamples and merged input descriptions.
 *
 * @param storybook — Storybook group with story import paths
 * @param version — Version config (for the git tag)
 * @param extraGroups — Additional storybook groups to include
 * @returns Structured result with examples and descriptions, or null
 */
export function readStorySourceFromGit(storybook: StorybookGroup | null, version: VersionConfig, extraGroups?: StorybookGroup[]): StoryCollectionResult | null {
	const allGroups = [storybook, ...(extraGroups ?? [])].filter(Boolean) as StorybookGroup[];
	if (allGroups.length === 0) return null;

	const seen = new Set<string>();
	const examples: StoryExample[] = [];
	const inputDescriptions = new Map<string, string>();

	const allStories = allGroups.flatMap((g) => g.stories);

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

			// Skip stories with no templates (nothing useful to show)
			if (extracted.templates.length === 0 && extracted.imports.length === 0) continue;

			// Derive a file slug from the import path
			const fileSlug = deriveFileSlug(story.importPath, story.framework);
			const displayName = deriveDisplayName(story.importPath);

			examples.push({
				fileSlug,
				name: displayName,
				framework: story.framework,
				importPath: story.importPath,
				imports: extracted.imports,
				templates: extracted.templates,
			});
		} catch {
			// File doesn't exist in this tag — skip
		}
	}

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
	return templates.length > 0 ? templates : null;
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
function gitShowFile(tag: string, filePath: string): string | null {
	try {
		return execFileSync('git', ['show', `${tag}:${filePath}`], {
			cwd: WORKSPACE_ROOT,
			encoding: 'utf-8',
			maxBuffer: 1024 * 1024,
			stdio: ['pipe', 'pipe', 'pipe'],
		});
	} catch {
		return null;
	}
}

/** Import lines to exclude from story output. */
const IMPORT_EXCLUDE_PATTERNS = [
	/['"]@storybook\//,          // @storybook/angular, @storybook/test, etc.
	/['"]storybook\//,           // storybook/test, etc.
	/['"]stories\/helpers/,      // shared test helpers
	/\.stories['"]/,             // cross-story imports (e.g., './button-basic.stories')
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

/**
 * Extracts all template literal values from story files.
 *
 * Looks for two patterns:
 * 1. `template: \`...\`` — direct template assignments
 * 2. `return \`...\`` — template returned from helper functions (common in HTML/CSS stories)
 */
function extractTemplateLiterals(content: string): string[] {
	const results: string[] = [];
	const patterns = ['template:', 'return'];

	for (const searchStr of patterns) {
		let pos = 0;
		while (pos < content.length) {
			const idx = content.indexOf(searchStr, pos);
			if (idx === -1) break;

			let i = idx + searchStr.length;
			while (i < content.length && (content[i] === ' ' || content[i] === '\n' || content[i] === '\r' || content[i] === '\t')) i++;

			if (content[i] !== '`') {
				pos = idx + searchStr.length;
				continue;
			}

			i++;
			const { text, endPos } = readTemplateLiteral(content, i);
			if (text.trim()) results.push(text);
			pos = endPos;
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
export function extractBasicUsage(storybook: StorybookGroup | null, version: VersionConfig): string | null {
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

		const templates = extractTemplateLiterals(content);
		if (templates.length === 0) return null;

		// Take the first template and clean it
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
		const output = execFileSync('git', ['ls-tree', '--name-only', '-d', tag, 'packages/scss/src/components/'], {
			cwd: WORKSPACE_ROOT,
			encoding: 'utf-8',
			maxBuffer: 512 * 1024,
			stdio: ['pipe', 'pipe', 'pipe'],
		});
		const names = new Set(
			output.split('\n')
				.map((line) => line.replace('packages/scss/src/components/', '').trim())
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
