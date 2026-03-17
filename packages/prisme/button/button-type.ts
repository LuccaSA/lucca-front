/**
 * Available ButtonComponent Types
 */

export const ButtonSizeList = ['M', 'S', 'XS'] as const;
export type ButtonSize = (typeof ButtonSizeList)[number];

export const ButtonStateList = ['default', 'loading', 'error', 'success'] as const;
export type ButtonState = (typeof ButtonStateList)[number];

export const ButtonTypeList = ['', 'outlined', 'AI', 'AI-invert', 'ghost', 'ghost-invert', 'text', 'text-invert'];
export type ButtonType = (typeof ButtonTypeList)[number];
