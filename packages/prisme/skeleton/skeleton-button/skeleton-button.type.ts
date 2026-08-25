/**
 * Available SkeletonButtonComponent Sizes
 */

export const SKELETON_BUTTON_SIZE = ['XS', 'S', 'M'] as const;
export type SkeletonButtonSize = (typeof SKELETON_BUTTON_SIZE)[number];
