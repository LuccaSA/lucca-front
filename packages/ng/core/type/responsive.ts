export type At = 'media' | 'container';
export type Breakpoint = 'XXXS' | 'XXS' | 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL' | 'XXXL';

/**
 * Breakpoints in em, useful for media queries
 *
 * Equivalent of `$breakpoints` (from scss/src/commons/config.scss)
 */
export const defaultBreakpoints = {
	XXXS: `${320 / 16}em`,
	XXS: `${480 / 16}em`,
	XS: `${640 / 16}em`,
	S: `${800 / 16}em`,
	M: `${1024 / 16}em`,
	L: `${1280 / 16}em`,
	XL: `${1366 / 16}em`,
	XXL: `${1600 / 16}em`,
	XXXL: `${1920 / 16}em`,
} as const satisfies Record<Breakpoint, `${number}em`>;

export type ResponsiveConfig<T extends string, V> = Partial<Record<ResponsiveProperty<T>, V>>;
export type ResponsiveProperty<T extends string> = `${T}At${Capitalize<At>}Min${Breakpoint}`;
