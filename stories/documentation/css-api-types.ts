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
	/**
	 * Migration target. The generator drops any replacement it cannot resolve, so this
	 * always names an entry in the dataset — but it validates against the deprecation
	 * source's own beliefs, so a target wrongly believed current survives.
	 */
	replacement?: string;
	note?: string;
	/** Mixins only: the `@use` path a consumer imports. Always under `commons/utils`. */
	import?: string;
	/** Mixins only: doc comment above the definition. */
	doc?: string;
}
