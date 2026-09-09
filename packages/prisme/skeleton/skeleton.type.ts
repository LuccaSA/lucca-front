/**
 * Available SkeletonComponent Types
 */

export const SKELETON_COLS_ALIGN = ['start', 'center', 'end'] as const;
export type SkeletonColsAlign = (typeof SKELETON_COLS_ALIGN)[number];
