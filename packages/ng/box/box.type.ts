/**
 * Available BoxComponent Types
 */

export const BOX_THEME = ['white', 'neutral', 'sunken', 'fancyWhite', 'fancyLight', 'fancyDark'] as const;
export type BoxTheme = (typeof BOX_THEME)[number];

export const BOX_HX = [1, 2, 3, 4, 5, 6] as const;
export type BoxHx = (typeof BOX_HX)[number];
