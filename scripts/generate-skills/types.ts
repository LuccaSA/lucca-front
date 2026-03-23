/**
 * Types partagés pour le script generate-skills.
 */

// ─── Config ──────────────────────────────────────────────────────────────────

export interface AiConfig {
	provider: 'anthropic' | 'openai' | 'github-models';
	model: string;
	apiKey: string;
	concurrency: number;
}

export interface FigmaConfig {
	token: string;
	fileKey: string;
	nodeId: string;
}

export interface StorybookConfig {
	indexUrl: string;
	baseUrl: string;
}

export interface ZeroheightConfig {
	mcpUrl: string;
}

export interface OutputConfig {
	skillsDir: string;
}

export interface Config {
	ai: AiConfig;
	figma: FigmaConfig;
	storybook: StorybookConfig;
	zeroheight: ZeroheightConfig;
	output: OutputConfig;
}

// ─── Figma ────────────────────────────────────────────────────────────────────

export interface FigmaComponent {
	id: string;
	nodeId: string;
	name: string;
	description: string;
	pageName: string;
	sectionName: string;
	componentSetName: string;
	nodeUrl: string;
}

export interface FigmaGroup {
	figmaName: string;
	slug: string;
	components: FigmaComponent[];
	nodeUrl: string;
	description: string;
}

// ─── Storybook ────────────────────────────────────────────────────────────────

export interface StorybookStory {
	id: string;
	name: string;
	title: string;
	url: string;
	importPath?: string;
	componentPath?: string;
	framework: 'angular' | 'html-css';
}

export interface StorybookDocsEntry {
	id: string;
	title: string;
	url: string;
}

export interface StorybookGroup {
	storybookName: string;
	slug: string;
	category: string;
	stories: StorybookStory[];
	docsEntry: StorybookDocsEntry | null;
}

// ─── MCP / Zeroheight ─────────────────────────────────────────────────────────

export interface McpTool {
	name: string;
	[key: string]: unknown;
}

export interface McpContext {
	mcpUrl: string;
	availableTools: string[];
}

// ─── Component map ────────────────────────────────────────────────────────────

export interface ComponentMapEntry {
	slug: string;
	storybook?: string;
}

export type ComponentMapSingleValue = string | ComponentMapEntry | null;
export type ComponentMapValue = ComponentMapSingleValue | (string | ComponentMapEntry)[];

export interface ComponentMap {
	[figmaKey: string]: ComponentMapValue;
}

// ─── Match results ────────────────────────────────────────────────────────────

export interface MatchedEntry {
	slug: string;
	figma: FigmaGroup;
	storybook?: StorybookGroup;
	additionalStorybook?: StorybookGroup[];
	relatedStorybook?: (StorybookGroup & { sbSlug: string })[];
	fuzzyMatch?: { storybookSlug: string; distance: number };
}

export interface FigmaOnlyEntry {
	slug: string;
	figma: FigmaGroup;
	reason: string;
}

export interface StorybookOnlyEntry {
	slug: string;
	storybook: StorybookGroup;
}

export interface MatchResult {
	matched: MatchedEntry[];
	figmaOnly: FigmaOnlyEntry[];
	storybookOnly: StorybookOnlyEntry[];
}

// ─── Skill writer ─────────────────────────────────────────────────────────────

export interface WriteMeta {
	category?: string;
	figmaName?: string;
	storybookName?: string;
}

export type WriteStatus = 'created' | 'updated' | 'skipped';

export interface WriteResult {
	status: WriteStatus;
	path: string;
}

export interface IndexEntry {
	description: string;
	category: string;
	figmaName: string;
	storybookName: string;
}

export interface SkillIndex {
	[slug: string]: IndexEntry;
}

// ─── AI client ────────────────────────────────────────────────────────────────

export type GenerateTextFn = (args: { systemPrompt: string; userPrompt: string }) => Promise<string>;
