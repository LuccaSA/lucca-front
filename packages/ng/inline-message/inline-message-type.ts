/**
 * Available InlineMessageComponent Sizes
 */

export const INLINE_MESSAGE_SIZE = ['S', 'M'] as const;
export type InlineMessageSize = (typeof INLINE_MESSAGE_SIZE)[number];
