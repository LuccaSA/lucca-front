/**
 * Available AbstractDateComponent Types
 */

export const DATE2_CLEAR_BEHAVIOR = ['clear', 'reset'] as const;
export type Date2ClearBehavior = (typeof DATE2_CLEAR_BEHAVIOR)[number];
