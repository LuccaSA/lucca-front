/**
 * Shape of the generated CSS API dataset. Hand-written so regenerating
 * `css-api-manifest.ts` never rewrites the types.
 */

export type CssApiKind = 'variable' | 'utility' | 'mixin';

export interface CssApiEntry {
	kind: CssApiKind;
	/** Custom property name, class name, or `namespace.mixin`. */
	name: string;
	/** Category for variables, namespace for mixins. Absent for utilities. */
	group?: string;
	/** Declared value, CSS declarations, or mixin signature depending on `kind`. */
	value: string;
	/** Present when following `var()` chains produced a different, concrete value. */
	resolved?: string;
	/** Media or container queries this utility also has variants for. */
	variants?: string[];
	deprecated?: boolean;
	/** Always names an existing, non-deprecated entry — the generator validates it. */
	replacement?: string;
	note?: string;
	/** Mixins only: the `@use` path a consumer imports. */
	import?: string;
	/** Mixins only: doc comment above the definition. */
	doc?: string;
}
