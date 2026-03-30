/**
 * Available ClearComponent sizes
 */

export const CLEAR_SIZE = ['S'] as const;
export type ClearSize = (typeof CLEAR_SIZE)[number];
