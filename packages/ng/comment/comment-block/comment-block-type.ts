/**
 * Available CommentBlockComponent Sizes
 */

export const COMMENT_BLOCK_SIZE = ['S', 'M'] as const;
export type CommentBlockSize = (typeof COMMENT_BLOCK_SIZE)[number];
