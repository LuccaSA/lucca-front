/**
 * Available HighlightDataComponent Types
 */

export const HIGHLIGHT_DATA_THEME = ['white', 'light', 'dark'] as const;
export type HighlightDataTheme = (typeof HIGHLIGHT_DATA_THEME)[number];

export const HIGHLIGHT_DATA_PALETTE = ['lucca', 'cleemy', 'timmi', 'poplee', 'coreHR', 'pagga', 'cc', 'success', 'warning', 'critical'] as const;
export type HighlightDataPalette = (typeof HIGHLIGHT_DATA_PALETTE)[number];

export const HIGHLIGHT_DATA_SIZE = ['XS', 'S', 'M'] as const;
export type HighlightDataSize = (typeof HIGHLIGHT_DATA_SIZE)[number];

export const HIGHLIGHT_DATA_BUBBLE = [1, 2, 3, 4] as const;
export type HighlightDataBubble = (typeof HIGHLIGHT_DATA_BUBBLE)[number];

export const HIGHLIGHT_DATA_ILLUSTRATION = [
	'calculator',
	'calendar',
	'cleemy-card',
	'coffee',
	'headphone',
	'mail',
	'magnifying-glass',
	'medallon',
	'piggy-bank',
	'polaroid-female',
	'polaroid-male',
	'polaroids',
] as const;
export type HighlightDataIllustration = (typeof HIGHLIGHT_DATA_ILLUSTRATION)[number] | 'manifying-glass';
