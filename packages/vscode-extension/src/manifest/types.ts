/** Shape of the manifest shipped inside @lucca-front/scss (css-api/manifest.json). */

export type VariableCategory = 'token' | 'palette' | 'commons' | 'breakpoint';

export interface CustomProperty {
	value: string;
	/** Resolved value when the raw value contained var() chains; absent otherwise. */
	resolved?: string;
	category: VariableCategory;
	deprecated?: boolean;
	/** Optional human note (from a `/* @deprecated <note> *\/` source comment). */
	note?: string;
}

/** A single applied CSS block for a utility class (for hover display). */
export interface UtilityCssBlock {
	decls: string;
	/** Declarations with var() chains resolved to concrete values; absent when `decls` has no var(). */
	resolved?: string;
	/** Pseudo-selector suffix, e.g. `:focus-visible`. */
	sel?: string;
	/** Media query params when the class only applies under a media condition. */
	media?: string;
	/** Container query params when the class only applies under a container condition. */
	container?: string;
}

export interface UtilityClass {
	css: UtilityCssBlock[];
	deprecated?: boolean;
	replacement?: string;
	note?: string;
}

/** A consumer-facing `@mixin` from `commons/utils/*.scss`. */
export interface MixinDef {
	/** Mixin name, e.g. `min`. */
	name: string;
	/** Namespace a consumer calls it under (the util file basename), e.g. `media`. */
	namespace: string;
	/** Source module path, e.g. `commons/utils/media`. */
	module: string;
	/** The `@use` import string, e.g. `@lucca-front/scss/src/commons/utils/media`. */
	import: string;
	/** Raw parameter list (empty when the mixin takes none). */
	params: string;
	/** `name(params)` (or just `name` when parameterless), for display. */
	signature: string;
	/** Doc text harvested from the leading source comment, when present. */
	doc?: string;
}

export interface Manifest {
	manifestVersion: number;
	package: string;
	variables: Record<string, CustomProperty>;
	utilities: Record<string, UtilityClass>;
	/** Absent in manifests generated before mixin support was added. */
	mixins?: MixinDef[];
}
