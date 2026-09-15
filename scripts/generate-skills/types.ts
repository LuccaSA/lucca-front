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
	/** Declared story family — set only to break a grouping collision between two different components.
	 * See `restrictToStoryFamily`. */
	storybookFamily?: string;
	/** ZeroHeight page path segment, e.g. "098404-button". Stable across releases. */
	zeroheightPagePath?: string;
	/** Angular package name (from @lucca-front/ng/<package>), e.g. "button". Omit for CSS-only components.
	 * May be a secondary entrypoint path, e.g. "forms/phone-number-input". */
	ngPackage?: string;
	/** Restrict the extracted API to components/directives whose selector is in this list. Use to scope a
	 * single component out of a multi-component package (e.g. "lu-text-input" from the "forms" package). */
	ngSelectors?: string[];
	/** SCSS component folder under `packages/scss/src/components`, e.g. "checkboxField". Only needed when
	 * neither `ngPackage` nor the slug resolves to it (the Angular entrypoint and the SCSS folder often
	 * differ: `date2` → `dateField`, `input` → `textField`). Set to "" for a component with no SCSS
	 * counterpart, to silence the resolution warning. */
	scssComponent?: string;
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
	/**
	 * Alternate ZH page uids to try when `zhPagePath` doesn't serve markdown. A page moved in the
	 * styleguide gets a NEW uid in later releases while the old uid keeps working on pinned ones
	 * (and vice versa) — e.g. « Noms des logiciels » : 784b6c (≤ 21.2) / 933984 (≥ 21.3).
	 */
	zhPagePathAlternates?: string[];
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
	/** JSDoc @deprecated message (non-empty when the member is deprecated). */
	deprecated?: string;
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
	/** JSDoc @deprecated message (non-empty when the member is deprecated). */
	deprecated?: string;
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
	/** JSDoc @deprecated message (non-empty when the member is deprecated). */
	deprecated?: string;
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
	/** JSDoc @deprecated message on the class itself. */
	deprecated?: string;
	/** Source file the class was extracted from (attachment heuristics; not rendered). */
	sourceFile?: string;
}

/** An exported `provide*()` / `configure*()` function (environment/component providers). */
export interface ExtractedProvider {
	/** Function name, e.g. "provideLuDialog". */
	name: string;
	/** Terse signature: params + return type, e.g. "(): Provider". */
	signature: string;
	/** JSDoc summary (first prose line). */
	description?: string;
	/** JSDoc @deprecated message. */
	deprecated?: string;
	/** Source file (attachment heuristics; not rendered). */
	sourceFile?: string;
}

/** An exported `InjectionToken` const. */
export interface ExtractedToken {
	/** Const name, e.g. "USER_POPOVER_IS_ACTIVATED". */
	name: string;
	/** Token value type (InjectionToken generic), e.g. "boolean". */
	type: string;
	description?: string;
	deprecated?: string;
	sourceFile?: string;
}

/** An exported `@Pipe` class. */
export interface ExtractedPipe {
	/** Template name, e.g. "luDate". */
	name: string;
	className: string;
	/** transform() signature, e.g. "(value: Date | string, format?: string): string". */
	transformSignature?: string;
	description?: string;
	deprecated?: string;
	sourceFile?: string;
}

/** An exported `@Injectable` service class (imperative API). */
export interface ExtractedService {
	/** Class name, e.g. "LuDialogService". */
	className: string;
	/** Public method signatures, e.g. "open<C>(config: LuDialogConfig<C>): LuDialogRef<C>". */
	methods: string[];
	description?: string;
	deprecated?: string;
	sourceFile?: string;
}

/** An exported `@NgModule` carrying a @deprecated JSDoc (captured for migration info only). */
export interface DeprecatedModule {
	className: string;
	deprecated: string;
	sourceFile?: string;
}

/** All APIs extracted for a component package (may contain multiple directives/components). */
export interface PackageAPI {
	/** The ng package name, e.g. "button". */
	ngPackage: string;
	/** All Angular classes exported by this package. */
	apis: ExtractedAPI[];
	/** Exported provide/configure functions of the package (scoped by file affinity). */
	providers: ExtractedProvider[];
	/** Exported InjectionToken consts. */
	tokens: ExtractedToken[];
	/** Exported @Pipe classes. */
	pipes: ExtractedPipe[];
	/** Exported @Injectable services (imperative API). */
	services: ExtractedService[];
	/** Exported @NgModule classes that are @deprecated. */
	deprecatedModules: DeprecatedModule[];
}

// ─── Storybook ────────────────────────────────────────────────────────────────

export interface StorybookStory {
	id: string;
	name: string;
	title: string;
	url: string;
	importPath?: string;
	framework: 'angular' | 'html-css';
	/**
	 * false when `framework` is a fallback guess rather than a decision (neither the story folder
	 * layout nor the Storybook title carried a framework segment). Such stories are re-classified
	 * from their source by `resolveStoryFrameworks()`.
	 */
	frameworkConfident: boolean;
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
	/**
	 * Sass import lines curated on ZeroHeight for this story (`@forward` / `@use`), merged with the
	 * component's base `@forward`. Kept apart from `zhTsImports`: a single untyped `zhImports` field
	 * is what let TypeScript imports be rendered inside a ```css fence.
	 */
	zhScssImports?: string[];
	/** Consumer TypeScript import lines curated on ZeroHeight (preferred over story imports). */
	zhTsImports?: string[];
	/** ZeroHeight code excerpts that are not import statements (option objects, usage fragments). */
	zhSnippets?: StorySnippet[];
	/** Contextual note from ZeroHeight associated with this story. */
	zhNote?: string;
}

/**
 * A ZeroHeight code excerpt kept verbatim, with the language it must be fenced as.
 *
 * `scss` rather than `css` on purpose: the ```css fence is reserved for a story's import block, so
 * the output guard can require that fence to hold nothing but `@forward` / `@use`.
 */
export interface StorySnippet {
	lang: 'ts' | 'scss';
	code: string;
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

/** One published patch of a minor (fixes/<M-m-p>.md documents its delta). */
export interface PatchManifestEntry {
	tag: string;
	storybookBaseUrl: string;
	generatedAt: string;
}

/** One generated minor skill. references/ documents `latestPatch`; fixes/ covers the others. */
export interface MinorManifestEntry {
	/** Latest published patch of the minor, e.g. "21.2.5" — what references/ documents. */
	latestPatch: string;
	tag: string;
	zhReleaseId: number | null;
	storybookBaseUrl: string;
	generatedAt: string;
	componentCount: number;
	/** Every published patch of the minor, ascending ("21.2.0" → …). */
	patches: Record<string, PatchManifestEntry>;
	/** Technical minors covered by this minor's skill (e.g. "21.4" for 21.3), if any. */
	technicalMinors?: Record<string, TechnicalMinorManifestEntry>;
}

export interface TechnicalMinorManifestEntry {
	/** Why the minor is technical (e.g. "compatibilité Angular 22"). */
	reason: string;
	/** Latest published patch of the technical minor, e.g. "21.4.2". */
	latestPatch: string;
	/** Every published patch of the technical minor, ascending. Patches > .0 have a fixes/ file. */
	patches: Record<string, PatchManifestEntry>;
}

export interface VersionManifest {
	/** Latest generated minor, e.g. "21.3". */
	latest: string;
	minors: Record<string, MinorManifestEntry>;
}
