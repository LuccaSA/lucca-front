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

export interface Manifest {
	manifestVersion: number;
	package: string;
	variables: Record<string, CustomProperty>;
	utilities: Record<string, UtilityClass>;
}
