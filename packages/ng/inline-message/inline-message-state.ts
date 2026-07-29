export const INLINE_MESSAGE_STATE = ['success', 'warning', 'error', 'default'] as const;
export type InlineMessageState = (typeof INLINE_MESSAGE_STATE)[number];
