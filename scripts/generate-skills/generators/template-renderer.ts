/**
 * Template renderer for SKILL.md files using Handlebars.
 *
 * Takes ComponentData and renders it through .hbs templates
 * to produce deterministic markdown output.
 */

import fs from 'fs';
import path from 'path';
import Handlebars from 'handlebars';
import { ComponentData, DesignSection, FigmaDesignTokens, SharedTypeDef, StoryExample } from '../types';

const TEMPLATES_DIR = path.join(__dirname, '..', 'templates');

// Register helpers
Handlebars.registerHelper('join', (arr: string[], separator: string) => {
	if (!Array.isArray(arr)) return '';
	return arr.join(separator);
});

Handlebars.registerHelper('eq', (a: unknown, b: unknown) => a === b);
Handlebars.registerHelper('gt', (a: number, b: number) => a > b);
Handlebars.registerHelper('escapePipe', (str: string) => {
	if (typeof str !== 'string') return str;
	return str.replace(/\|/g, '\\|');
});

// Template cache
const templateCache = new Map<string, HandlebarsTemplateDelegate>();

function getTemplate(name: string): HandlebarsTemplateDelegate {
	if (!templateCache.has(name)) {
		const src = fs.readFileSync(path.join(TEMPLATES_DIR, `${name}.hbs`), 'utf-8');
		templateCache.set(name, Handlebars.compile(src, { noEscape: true }));
	}
	return templateCache.get(name)!;
}

/**
 * Renders the main component skill markdown (API + Basic Usage + links).
 */
export function renderComponentMd(data: ComponentData): string {
	const template = getTemplate('component');

	const context = {
		slug: data.slug,
		entry: data.entry,
		api: data.api,
		primaryImportPath: data.api?.apis[0]?.importPath ?? (data.entry.ngPackage ? `@lucca-front/ng/${data.entry.ngPackage}` : undefined),
		storybook: data.storybook,
		basicUsage: data.basicUsage,
		version: data.version,
		hasExamples: data.storyExamples && data.storyExamples.length > 0,
		hasDesign: data.zeroheight !== null,
		hasFigma: data.entry.figmaNodeIds && data.entry.figmaNodeIds.length > 0,
		expandedTypeDefs: collectExpandedTypeDefs(data),
	};

	return cleanOutput(template(context));
}

/**
 * Splits ZeroHeight content into design sections and code sections (by H1).
 * Code sections (Angular, HTML) are separated for merging into <slug>.component.md.
 * Ignores any section whose title contains "changelog" (case-insensitive).
 * Content before the first H1 is returned as `overviewContent` (merged into the index).
 */
export function splitDesignSections(data: ComponentData): {
	designSections: DesignSection[];
	codeSections: DesignSection[];
	overviewContent: string;
} | null {
	if (!data.zeroheight) return null;

	const { designContent } = splitZeroHeightContent(data.zeroheight.raw);
	if (!designContent.trim()) return null;

	const cleaned = cleanZeroHeightMarkdown(designContent);
	return splitByH1(cleaned);
}

/** A note from ZeroHeight associated with one or more storybook story IDs. */
export interface ZhStoryNote {
	/** Storybook story IDs extracted from iframe links. */
	storyIds: string[];
	/** Consumer import lines (curated by design team). */
	imports: string[];
	/** Prose text associated with these stories. */
	note: string;
}

/**
 * Extracts ZH story notes from the raw ZH markdown (BEFORE cleaning).
 * Parses `<tab>` blocks to find storybook iframe links and associated text/imports.
 * Returns notes that can be mapped to StoryExample files via storybook IDs.
 */
export function extractZhStoryNotes(rawZh: string): ZhStoryNote[] {
	const { designContent } = splitZeroHeightContent(rawZh);
	const results: ZhStoryNote[] = [];

	// Extract all <tab>...</tab> blocks
	const tabRegex = /<tab>([\s\S]*?)<\/tab>/g;
	let match: RegExpExecArray | null;

	while ((match = tabRegex.exec(designContent)) !== null) {
		const tabContent = match[1];

		// Extract storybook story IDs from iframe links
		const storyIds: string[] = [];
		const linkRegex = /\[[^\]]*\]\(https?:\/\/[^\s)]*storybook\/iframe[^)]*\?[^)]*id=([^&)]+)[^)]*\)/g;
		let linkMatch: RegExpExecArray | null;
		while ((linkMatch = linkRegex.exec(tabContent)) !== null) {
			storyIds.push(linkMatch[1]);
		}

		if (storyIds.length === 0) continue;

		// Extract import lines from code blocks
		const imports: string[] = [];
		const codeBlockRegex = /```(?:ts|typescript|css)\n([\s\S]*?)```/g;
		let codeMatch: RegExpExecArray | null;
		while ((codeMatch = codeBlockRegex.exec(tabContent)) !== null) {
			const lines = codeMatch[1].trim().split('\n').map((l) => l.trim()).filter(Boolean);
			imports.push(...lines);
		}

		// Extract prose text (everything except tab-title, code blocks, storybook links)
		let note = tabContent
			.replace(/<tab-title>[\s\S]*?<\/tab-title>/g, '')
			.replace(/```[\s\S]*?```/g, '')
			.replace(/\[[^\]]*\]\(https?:\/\/[^\s)]*storybook\/iframe[^)]*\)/g, '')
			.replace(/\n{3,}/g, '\n\n')
			.trim();

		// Strip empty notes
		if (!note || note.length < 5) note = '';

		results.push({ storyIds, imports, note });
	}

	return results;
}

/**
 * Renders the design index markdown (design/_index.md).
 */
export function renderDesignIndexMd(slug: string, sections: DesignSection[], overviewContent: string, zhPagePath: string): string {
	const template = getTemplate('design-index');
	return cleanOutput(template({ slug, sections, overviewContent: overviewContent || null, zhPagePath }));
}

/**
 * Renders a single design section file (design/<section>.md).
 */
export function renderDesignSectionMd(slug: string, section: DesignSection): string {
	const template = getTemplate('design-section');
	return cleanOutput(template({ slug, ...section }));
}

/**
 * Renders the component page markdown (<slug>.component.md).
 * Merges ZH code sections (Angular, HTML) as implementation notes before stories listing.
 */
export function renderComponentPageMd(data: ComponentData, codeSections: DesignSection[] = []): string | null {
	const hasExamples = data.storyExamples && data.storyExamples.length > 0;
	if (!hasExamples && codeSections.length === 0) return null;

	const template = getTemplate('component-page');

	const angularSection = codeSections.find((s) => /angular/i.test(s.title));
	const htmlSection = codeSections.find((s) => /html/i.test(s.title));

	const angularExamples = (data.storyExamples ?? []).filter((e) => e.framework === 'angular');
	const htmlExamples = (data.storyExamples ?? []).filter((e) => e.framework === 'html-css');

	const zhAngularNotes = angularSection ? cleanCodeSectionForExamples(angularSection.content) || null : null;
	const zhHtmlNotes = htmlSection ? cleanCodeSectionForExamples(htmlSection.content) || null : null;

	const context = {
		slug: data.slug,
		storybook: data.storybook,
		angularExamples,
		htmlExamples,
		zhAngularNotes,
		zhHtmlNotes,
		hasAngular: angularExamples.length > 0 || !!zhAngularNotes,
		hasHtml: htmlExamples.length > 0 || !!zhHtmlNotes,
	};

	return cleanOutput(template(context));
}

/**
 * Renders a single story file.
 */
export function renderStoryMd(slug: string, example: StoryExample, scssImport?: string): string {
	const template = getTemplate('example');
	const isHtml = example.framework === 'html-css';

	// For HTML/CSS stories: merge ZH imports (SCSS) with the base scssImport into a single CSS block
	// For Angular stories: use ZH imports (curated) if available, otherwise filtered story imports
	let cssImportBlock: string | undefined;
	let displayImports: string[];

	if (isHtml) {
		const cssLines = [scssImport, ...(example.zhImports ?? [])].filter(Boolean) as string[];
		cssImportBlock = cssLines.length > 0 ? cssLines.join('\n') : undefined;
		displayImports = []; // HTML stories don't have JS consumer imports
	} else {
		cssImportBlock = undefined;
		displayImports = example.zhImports ?? example.imports;
	}

	const context = {
		slug,
		...example,
		displayImports,
		scssImport: cssImportBlock,
	};
	return cleanOutput(template(context));
}

/**
 * Renders the changelog markdown (extracted from ZeroHeight content).
 */
export function renderChangelogMd(data: ComponentData): string | null {
	if (!data.zeroheight) return null;

	const template = getTemplate('changelog');
	const { changelogContent } = splitZeroHeightContent(data.zeroheight.raw);

	const context = {
		slug: data.slug,
		changelogContent: changelogContent || null,
	};

	return cleanOutput(template(context));
}

/**
 * Renders the Figma design tokens skill markdown.
 */
export function renderFigmaMd(slug: string, figmaTokens: FigmaDesignTokens[], figmaFileKey: string): string {
	const template = getTemplate('component-figma');

	const context = {
		slug,
		figma: figmaTokens,
		figmaFileKey,
	};

	return cleanOutput(template(context));
}

/**
 * Splits ZeroHeight content into design guidelines and changelog.
 * The changelog typically starts with a heading containing "changelog".
 * We strip the introductory changelog headings and keep versioned entries.
 */
function splitZeroHeightContent(raw: string): { designContent: string; changelogContent: string } {
	// Look for a heading containing "changelog" (case-insensitive)
	const changelogPattern = /^(#{1,3})\s+.*changelog.*$/im;
	const match = changelogPattern.exec(raw);

	if (!match || match.index === undefined) {
		return { designContent: raw, changelogContent: '' };
	}

	const designContent = raw.slice(0, match.index).trim();
	let changelogContent = raw.slice(match.index).trim();

	// Strip introductory headings that just say "Changelog" or "<Component> — Changelog"
	// Keep only the versioned content (## [version] entries)
	changelogContent = changelogContent
		.replace(/^#{1,3}\s+.*changelog.*\n*/gim, '')
		.replace(/^#{1,3}\s+\S+\s*—\s*changelog\n*/gim, '')
		.trim();

	return { designContent, changelogContent };
}

/**
 * H1 section titles that represent code/implementation sections.
 * These are excluded from design/ and merged into <slug>.component.md instead.
 */
const CODE_SECTION_TITLE_PATTERNS = /\bangular\b|\bhtml\b|\bcss\b/i;

/**
 * Splits markdown content by H1 headings into design and code sections.
 * Content before the first H1 is returned as `overviewContent`.
 * Sections whose title contains "changelog" are excluded.
 * Sections matching code-related patterns (Angular, HTML) go to `codeSections`.
 */
function splitByH1(markdown: string): {
	designSections: DesignSection[];
	codeSections: DesignSection[];
	overviewContent: string;
} {
	const lines = markdown.split('\n');
	const designSections: DesignSection[] = [];
	const codeSections: DesignSection[] = [];
	let overviewLines: string[] = [];
	let currentTitle: string | null = null;
	let currentLines: string[] = [];
	let beforeFirstH1 = true;

	function flush(): void {
		let content = currentLines.join('\n').trim();
		if (!content || !currentTitle) return;

		// Remove leading --- (orphaned after cleaning metadata above H1)
		content = content.replace(/^(---\s*)+/, '').trim();
		if (!content) return;

		// Ignore changelog sections
		if (/changelog/i.test(currentTitle)) return;

		const section: DesignSection = {
			fileSlug: slugify(currentTitle),
			title: currentTitle,
			description: sectionDescription(currentTitle),
			content,
		};

		if (CODE_SECTION_TITLE_PATTERNS.test(currentTitle)) {
			codeSections.push(section);
		} else {
			designSections.push(section);
		}
	}

	for (const line of lines) {
		const h1Match = /^# (.+)$/.exec(line);
		if (h1Match) {
			if (beforeFirstH1) {
				overviewLines = currentLines;
				beforeFirstH1 = false;
			} else {
				flush();
			}
			currentTitle = h1Match[1].trim();
			currentLines = [];
		} else {
			currentLines.push(line);
		}
	}
	flush();

	return { designSections, codeSections, overviewContent: overviewLines.join('\n').trim() };
}

// ── ZeroHeight content cleaning ──────────────────────────────────────────────

/**
 * Cleans ZeroHeight markdown to reduce token waste.
 * Removes image placeholders, empty table columns, non-functional markup, etc.
 */
export function cleanZeroHeightMarkdown(md: string): string {
	let result = md;

	// Strip YAML frontmatter block at the start of the content (---\n...\n---\n)
	result = result.replace(/^---\n[\s\S]*?\n---\s*\n/, '');

	// Remove image placeholders: **🖼️ ...**
	result = result.replace(/^\*\*🖼️[^*]*\*\*\s*$/gm, '');

	// Remove "Mots-clés" metadata block (bold heading + following non-empty line)
	result = result.replace(/\*\*Mots-clés\*\*\n+[^\n]+\n?/g, '');

	// Remove "Des questions, commentaires ou retours ?" block
	result = result.replace(/\*\*Des questions[^*]*\*\*\n+[^\n]+\n?/g, '');

	// Remove <shortcut_tiles> blocks
	result = result.replace(/<shortcut_tiles>[\s\S]*?<\/shortcut_tiles>/g, '');

	// Remove "Contenus associés" sections (heading + everything until next ## or end)
	result = result.replace(/^##\s+Contenus\s+associés[\s\S]*?(?=\n##\s|$)/gm, '');

	// Remove <callout> tags (keep inner text)
	result = result.replace(/<callout[^>]*>\s*/g, '');
	result = result.replace(/\s*<\/callout>/g, '');

	// Remove <tab> blocks that contain storybook iframe links (story-specific content → moved to story files)
	result = result.replace(/<tab>[\s\S]*?<\/tab>/g, (match) => {
		if (/storybook\/iframe/.test(match)) return ''; // story-specific: remove entirely
		return match; // design tab: keep (tags will be stripped below)
	});

	// Remove <tabs>/<tab>/<tab-title> tags (keeps inner text for remaining tabs)
	result = result.replace(/<\/?tabs>\s*/g, '');
	result = result.replace(/<\/?tab>\s*/g, '');
	result = result.replace(/<tab-title>[^<]*<\/tab-title>\s*/g, '');

	// Convert Do/Don't tables (| Rule | Image | Caption | Description |) to simple lists
	result = convertDoTables(result);

	// Remove storybook iframe links
	result = result.replace(/^\[.*?\]\(https?:\/\/[^\s)]*storybook\/iframe[^)]*\)\s*$/gm, '');

	// Convert ZH links to plain text: [text](https://prisme.lucca.io/...) → text
	result = result.replace(/\[([^\]]+)\]\(https:\/\/prisme\.lucca\.io\/[^)]+\)/g, '$1');

	// Remove orphan horizontal rules (--- surrounded by blank lines)
	result = result.replace(/\n\n---\s*\n\n/g, '\n\n');
	result = result.replace(/\n---\s*\n---/g, '\n---');
	result = result.replace(/\n---\s*$/g, '');
	// Remove leading --- (left over after cleaning top-of-section metadata)
	result = result.replace(/^(\s*---\s*\n)+/, '');

	// Collapse excessive blank lines
	result = result.replace(/\n{3,}/g, '\n\n');

	return result.trim();
}

/**
 * Converts Do/Don't tables (| Rule | Image | Caption | Description |) to simple bullet lists.
 * These tables have mostly empty Image and Caption columns, wasting tokens.
 */
function convertDoTables(md: string): string {
	const lines = md.split('\n');
	const result: string[] = [];
	let i = 0;

	while (i < lines.length) {
		if (/^\|\s*Rule\s*\|/i.test(lines[i])) {
			i++; // skip header
			if (i < lines.length && /^\|[\s:|-]+\|/.test(lines[i])) i++; // skip separator
			while (i < lines.length && lines[i].trimStart().startsWith('|')) {
				const cells = lines[i].split('|').map((c) => c.trim());
				// cells: ['', Rule, Image, Caption, Description, '']
				const rule = cells[1] ?? '';
				const desc = cells[4] ?? '';
				if (rule && desc) {
					result.push(`- **${rule}** : ${desc}`);
				}
				i++;
			}
		} else {
			result.push(lines[i]);
			i++;
		}
	}

	return result.join('\n');
}

/**
 * Cleans code section content for embedding in the component page.
 * Strips the leading H2 heading (redundant with the framework heading) and trailing rules.
 * Removes code blocks (imports are noise — already in stories and API).
 */
function cleanCodeSectionForExamples(content: string): string {
	let result = content;
	// Remove leading H2 heading (e.g., "## Button Angular")
	result = result.replace(/^##\s+.*\n+/, '');
	// Remove trailing ---
	result = result.replace(/\n---\s*$/, '');
	// Remove markdown code blocks (```...```) — imports are already in stories/API
	result = result.replace(/```[\s\S]*?```/g, '');
	// Remove storybook iframe links that may remain outside tabs
	result = result.replace(/\[[^\]]*\]\(https?:\/\/[^\s)]*storybook[^\s)]*\)/g, '');
	// Clean up excessive blank lines left behind
	result = result.replace(/\n{3,}/g, '\n\n');
	return result.trim();
}

/** Maps well-known section titles to short descriptions for the index. */
const SECTION_DESCRIPTIONS: Record<string, string> = {
	design: 'Usage guidelines, visual hierarchy, spacing, states, and do/don\'t rules.',
	content: 'Wording, tone and labelling recommendations.',
	angular: 'Angular-specific implementation notes from ZeroHeight.',
	html: 'HTML/CSS-only implementation notes.',
	ios: 'iOS (Swift/UIKit) implementation notes.',
	android: 'Android (Kotlin/Compose) implementation notes.',
	accessibility: 'Accessibility guidelines (ARIA, keyboard, screen reader).',
	specs: 'Design specifications and measurements.',
};

function sectionDescription(title: string): string {
	return SECTION_DESCRIPTIONS[title.toLowerCase()] ?? '';
}

/**
 * Converts a title to a file-safe slug.
 */
function slugify(text: string): string {
	return text
		.toLowerCase()
		.normalize('NFD')
		.replace(/[\u0300-\u036f]/g, '')
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/^-|-$/g, '');
}

/**
 * Clean up template output — remove excessive blank lines.
 */
function cleanOutput(output: string): string {
	return output.replace(/\n{3,}/g, '\n\n').trim() + '\n';
}

/**
 * Collects expanded type definitions from the API inputs (e.g. LuccaIcon values).
 * Returns a deduplicated list of shared type defs for all inputs with expandedValues.
 */
function collectExpandedTypeDefs(data: ComponentData): Array<SharedTypeDef & { count: number }> {
	if (!data.api) return [];
	const seen = new Set<string>();
	const result: Array<SharedTypeDef & { count: number }> = [];
	for (const api of data.api.apis) {
		for (const input of api.inputs) {
			if (input.expandedValues && !seen.has(input.type)) {
				seen.add(input.type);
				result.push({ typeName: input.type, values: input.expandedValues, count: input.expandedValues.length });
			}
		}
	}
	return result;
}

/**
 * Collects all shared type definitions across multiple components (deduplicated).
 */
export function collectSharedTypeDefs(allData: ComponentData[]): SharedTypeDef[] {
	const seen = new Map<string, SharedTypeDef>();
	for (const data of allData) {
		if (!data.api) continue;
		for (const api of data.api.apis) {
			for (const input of api.inputs) {
				if (input.expandedValues && !seen.has(input.type)) {
					seen.set(input.type, { typeName: input.type, values: input.expandedValues });
				}
			}
		}
	}
	return [...seen.values()];
}

/**
 * Renders a shared type definition file (e.g. LuccaIcon.md).
 */
export function renderSharedTypeMd(typeDef: SharedTypeDef): string {
	const template = getTemplate('type-definition');
	return cleanOutput(template({ ...typeDef, count: typeDef.values.length }));
}
