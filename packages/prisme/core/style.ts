/**
 * Available CSS palettes
 */
// primary is deprecated
// grey is deprecated
export const PALETTE = ['success', 'warning', 'error', 'product', 'neutral', 'none', 'primary', 'grey', 'brand'] as const;
export type Palette = (typeof PALETTE)[number];

export const DECORATIVE_PALETTE = ['kiwi', 'lime', 'cucumber', 'mint', 'glacier', 'lagoon', 'blueberry', 'lavender', 'grape', 'watermelon', 'pumpkin', 'pineapple'] as const;
export type DecorativePalette = (typeof DECORATIVE_PALETTE)[number];
