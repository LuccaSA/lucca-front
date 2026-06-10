/**
 * Shared types for the generate-skills pipeline.
 *
 * This pipeline generates deterministic SKILL.md files (no AI) from:
 * - AST extraction (ts-morph) → Angular API
 * - ZeroHeight .md URLs → design guidelines
 * - Storybook index.json → story links & source code
 * - Figma Code Connect context → design variant tokens
 */

// ─── Config ──────────────────────────────────────────────────────────────────

export interface FigmaConfig {
	/** Figma Personal Access Token (only needed if Figma collection is enabled). */
	token?: string;
	/** Figma file key for the component library. */
	fileKey: string;
}

export interface OutputConfig {
	skillsDir: string;
}

export interface Config {
	figma: FigmaConfig;
	output: OutputConfig;
	/** Concurrency limit for parallel operations. */
	concurrency: number;
}

// ─── Version ─────────────────────────────────────────────────────────────────

export interface VersionConfig {
	/** Full semver tag, e.g. "v21.2.1". */
	tag: string;
	major: number;
	minor: number;
	patch: number;
	/** ZeroHeight release ID for this minor version. */
	zhReleaseId: number | null;
	/** Storybook base URL for this exact fix, e.g. "https://lucca-front.lucca.io/v21.2.1/storybook". */
	storybookBaseUrl: string;
}

// ─── Component map ────────────────────────────────────────────────────────────

export interface ComponentEntry {
	/** Storybook group slug for matching in the index. Omit if no storybook stories exist. */
	storybookSlug?: string;
	/** Full Storybook title path, e.g. "Documentation/Actions/Button/Angular". */
	storybookPath?: string;
	/** ZeroHeight page path segment, e.g. "098404-button". Stable across releases. */
	zeroheightPagePath?: string;
	/** Angular package name (from @lucca-front/ng/<package>), e.g. "button". Omit for CSS-only components. */
	ngPackage?: string;
	/** Primary Figma component name, e.g. "pr-Button". */
	figmaName?: string;
	/** All Figma names that map to this slug (many-to-one). */
	figmaAliases?: string[];
	/** Figma node IDs for Code Connect context retrieval. */
	figmaNodeIds?: string[];
	/** Additional Storybook story paths to include in examples. */
	extraStories?: string[];
	/** Category label, e.g. "Actions", "Forms". */
	category?: string;
	/** Minimum LF version where this component exists. */
	since?: string;
	/** Maximum LF version where this component exists (exclusive). */
	until?: string;
}

export interface ComponentMap {
	[slug: string]: ComponentEntry;
}

// ─── Documentation map ───────────────────────────────────────────────────────

export interface DocumentationEntry {
	slug: string;
	title: string;
	zhPagePath: string;
	subcategory?: string;
}

export interface DocumentationMap {
	tokens: DocumentationEntry[];
	content: DocumentationEntry[];
	guidelines: DocumentationEntry[];
	patterns: DocumentationEntry[];
}

// ─── AST extraction ──────────────────────────────────────────────────────────

export interface ExtractedInput {
	/** Property name in TypeScript, e.g. "size". */
	propName: string;
	/** Binding name in template (may differ from propName if aliased), e.g. "luButton". */
	bindingName: string;
	/** TypeScript type as declared, e.g. "'M' | 'S' | 'XS'". */
	type: string;
	/** Whether the input is required. */
	required: boolean;
	/** Default value if any, e.g. "'M'". */
	default?: string;
	/** Transform function name if any, e.g. "booleanAttribute". */
	transform?: string;
	/** Source: 'signal' for input(), 'decorator' for @Input(). */
	source: 'signal' | 'decorator';
	/** Human-readable description from Storybook argTypes. */
	description?: string;
	/**
	 * Expanded string literal values for large union types (e.g. LuccaIcon).
	 * When set, `type` keeps the alias name and these values are listed in a dedicated section.
	 */
	expandedValues?: string[];
	/**
	 * Name of the alias the expandedValues belong to. Equals `type` for a pure alias, or the
	 * union member that was expanded when the declared type is wider (e.g. "BubbleIllustration"
	 * for `BubbleIllustration | string | null`).
	 */
	expandedTypeName?: string;
}

export interface ExtractedOutput {
	/** Property name in TypeScript. */
	propName: string;
	/** Binding name in template (may differ if aliased). */
	bindingName: string;
	/** Emitted type, e.g. "void", "Date". */
	type: string;
	/** Source: 'signal' for output(), 'decorator' for @Output(). */
	source: 'signal' | 'decorator';
}

export interface ExtractedModel {
	/** Property name in TypeScript. */
	propName: string;
	/** Binding name in template. */
	bindingName: string;
	/** Model value type, e.g. "Date". */
	type: string;
	/** Whether the model is required. */
	required: boolean;
}

export interface ExtractedAPI {
	/** 'component' or 'directive'. */
	kind: 'component' | 'directive';
	/** Angular class name, e.g. "ButtonComponent". */
	className: string;
	/** All selectors (may have multiple), e.g. ["button[luButton]", "a[luButton]"]. */
	selectors: string[];
	/** Import path, e.g. "@lucca-front/ng/button". */
	importPath: string;
	/** Inputs extracted from the class. */
	inputs: ExtractedInput[];
	/** Outputs extracted from the class. */
	outputs: ExtractedOutput[];
	/** Two-way bound model() properties. */
	models: ExtractedModel[];
	/** exportAs value if any. */
	exportAs?: string;
	/** Whether the component is standalone. */
	standalone?: boolean;
}

/** All APIs extracted for a component package (may contain multiple directives/components). */
export interface PackageAPI {
	/** The ng package name, e.g. "button". */
	ngPackage: string;
	/** All Angular classes exported by this package. */
	apis: ExtractedAPI[];
}

// ─── Storybook ────────────────────────────────────────────────────────────────

export interface StorybookStory {
	id: string;
	name: string;
	title: string;
	url: string;
	importPath?: string;
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

// ─── Story source code ───────────────────────────────────────────────────────

export interface DesignSection {
	/** File slug derived from the H1 title, e.g. "design", "content", "angular". */
	fileSlug: string;
	/** Original H1 title, e.g. "Design", "Content", "Angular". */
	title: string;
	/** Short description of what this section covers (for the index). */
	description: string;
	/** Markdown content under this H1 (everything until the next H1 or EOF). */
	content: string;
}

export interface StoryExample {
	/** Filename slug for the example file, e.g. "angular-basic". */
	fileSlug: string;
	/** Display name, e.g. "Basic". */
	name: string;
	/** Framework. */
	framework: 'angular' | 'html-css';
	/** Source import path, e.g. "./stories/.../button-basic.stories.ts". */
	importPath: string;
	/** Non-storybook JS import lines from the story source file (fallback). */
	imports: string[];
	/** HTML template strings. */
	templates: string[];
	/** Consumer imports from ZeroHeight (curated, preferred over story imports). */
	zhImports?: string[];
	/** Contextual note from ZeroHeight associated with this story. */
	zhNote?: string;
}

/** Result from reading all stories for a component. */
export interface StoryCollectionResult {
	/** Individual story examples. */
	examples: StoryExample[];
	/** Merged input descriptions from argTypes across all stories (inputName → description). */
	inputDescriptions: Map<string, string>;
}

// ─── ZeroHeight ──────────────────────────────────────────────────────────────

export interface ZeroHeightData {
	/** Raw markdown content from ZeroHeight .md URL. */
	raw: string;
	/** Parsed sections (Design, Angular, HTML, Accessibility, Content…). */
	sections: Record<string, string>;
}

// ─── Figma design tokens ─────────────────────────────────────────────────────

export interface FigmaProperty {
	name: string;
	type: 'VARIANT' | 'TEXT' | 'INSTANCE_SWAP' | 'BOOLEAN';
	variantOptions?: string[];
}

export interface FigmaDesignTokens {
	/** Figma component name, e.g. "pr-Button". */
	componentName: string;
	/** Figma node ID, e.g. "6854:42773". */
	nodeId: string;
	/** Structured properties with variant options. */
	properties: FigmaProperty[];
}

// ─── Collected data (per component, ready for template rendering) ────────────

export interface ComponentData {
	slug: string;
	entry: ComponentEntry;
	version: VersionConfig;
	/** AST-extracted Angular API (may include multiple classes per package). */
	api: PackageAPI | null;
	/** ZeroHeight design guidelines. */
	zeroheight: ZeroHeightData | null;
	/** Storybook story group with links and source code. */
	storybook: StorybookGroup | null;
	/** Structured story examples (one per story file). */
	storyExamples: StoryExample[] | null;
	/** Minimal working HTML template extracted from the "basic" story. */
	basicUsage: string | null;
	/** Figma design tokens (not versioned — current state only). */
	figma: FigmaDesignTokens | null;
}

// ─── Skill writer ─────────────────────────────────────────────────────────────

export type WriteStatus = 'created' | 'updated' | 'skipped';

export interface WriteResult {
	status: WriteStatus;
	path: string;
}

// ─── Shared type definitions ─────────────────────────────────────────────────

/** A large union type extracted from code, shared across multiple components. */
export interface SharedTypeDef {
	/** Type alias name, e.g. "LuccaIcon". */
	typeName: string;
	/** All string literal values in the union. */
	values: string[];
}

// ─── Versions manifest ───────────────────────────────────────────────────────

export interface VersionManifestEntry {
	tag: string;
	zhReleaseId: number | null;
	storybookBaseUrl: string;
	generatedAt: string;
	componentCount: number;
}

export interface VersionManifest {
	latest: string;
	versions: Record<string, VersionManifestEntry>;
}
