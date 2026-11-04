/**
 * Available PriorityLevelComponent levels (1 = low, 2 = medium, 3 = high)
 */

export const PRIORITY_LEVELS = [1, 2, 3] as const;
export type PriorityLevel = (typeof PRIORITY_LEVELS)[number];

/**
 * Available PriorityLevelComponent sizes
 */

export const PRIORITY_LEVEL_SIZES = ['S', 'M', 'L'] as const;
export type PriorityLevelSize = (typeof PRIORITY_LEVEL_SIZES)[number];
