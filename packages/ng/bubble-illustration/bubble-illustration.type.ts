/**
 * Available BubbleIllustrationComponent Types
 */

export const BUBBLE_ILLUSTRATION_SIZE = ['S', 'M', 'L'] as const;
export type BubbleIllustrationSize = (typeof BUBBLE_ILLUSTRATION_SIZE)[number];
