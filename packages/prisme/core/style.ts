/**
 * Available CSS palettes
 */
// primary is deprecated
// grey is deprecated
export const PaletteList = ['success', 'warning', 'error', 'product', 'neutral', 'none', 'primary', 'grey', 'brand'] as const;
export type Palette = (typeof PaletteList)[number];

export const DecorativePaletteList = ['kiwi', 'lime', 'cucumber', 'mint', 'glacier', 'lagoon', 'blueberry', 'lavender', 'grape', 'watermelon', 'pumpkin', 'pineapple'] as const;
export type DecorativePalette = (typeof DecorativePaletteList)[number];
