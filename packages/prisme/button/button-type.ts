/**
 * Available ButtonComponent Types
 */

export const BUTTON_SIZE = ['M', 'S', 'XS'] as const;
export type ButtonSize = (typeof BUTTON_SIZE)[number];

export const BUTTON_STATE = ['default', 'loading', 'error', 'success'] as const;
export type ButtonState = (typeof BUTTON_STATE)[number];

export const BUTTON_TYPE = ['', 'outlined', 'AI', 'AI-invert', 'ghost', 'ghost-invert', 'text', 'text-invert'] as const;
export type ButtonType = (typeof BUTTON_TYPE)[number];
