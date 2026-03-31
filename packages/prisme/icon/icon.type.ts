/**
 * Available IconComponent types
 */

export const ICON_SIZE = ['XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL'] as const;
export type IconSize = (typeof ICON_SIZE)[number];

export const ICON_COLOR = ['primary', 'secondary', 'product', 'error', 'warning', 'success', 'light', 'placeholder', 'inherit'] as const;
export type IconColor = (typeof ICON_COLOR)[number];
