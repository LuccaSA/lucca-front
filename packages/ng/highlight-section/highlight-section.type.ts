/**
 * Available HighlightSectionComponent Types
 */

export const HIGHLIGHT_SECTION_THEME = ['white', 'light', 'dark'] as const;
export type HighlightSectionTheme = (typeof HIGHLIGHT_SECTION_THEME)[number];

export const HIGHLIGHT_SECTION_PALETTE = ['lucca', 'cleemy', 'timmi', 'poplee', 'coreHR', 'pagga', 'cc', 'success', 'warning', 'critical'] as const;
export type HighlightSectionPalette = (typeof HIGHLIGHT_SECTION_PALETTE)[number];

export const HIGHLIGHT_SECTION_BUBBLE = [1, 2, 3, 4] as const;
export type HighlightSectionBubble = (typeof HIGHLIGHT_SECTION_BUBBLE)[number];

export const HIGHLIGHT_SECTION_BUBBLE_POSITION = ['start', 'end', 'both'] as const;
export type HighlightSectionBubblePosition = (typeof HIGHLIGHT_SECTION_BUBBLE_POSITION)[number];

export const HIGHLIGHT_SECTION_ILLUSTRATION = [
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
	'post-it-success',
	'post-it-warning',
] as const;
export type HighlightSectionIllustration = (typeof HIGHLIGHT_SECTION_ILLUSTRATION)[number];
