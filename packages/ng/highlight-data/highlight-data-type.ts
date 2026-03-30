/**
 * Available HighlightDataComponent Types
 */

export const HIGHLIGHT_DATA_THEME = ['white', 'light', 'dark'] as const;
export type HighlightDataTheme = (typeof HIGHLIGHT_DATA_THEME)[number];

export const HIGHLIGHT_DATA_PALETTE = ['lucca', 'cleemy', 'timmi', 'poplee', 'coreHR', 'pagga', 'cc', 'success', 'warning', 'critical'] as const;
export type HighlightDataPalette = (typeof HIGHLIGHT_DATA_PALETTE)[number];

export const HIGHLIGHT_DATA_SIZE = ['XS', 'S', 'M'] as const;
export type HighlightDataSize = (typeof HIGHLIGHT_DATA_SIZE)[number];
