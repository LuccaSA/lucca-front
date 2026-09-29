/**
 * Available PriorityLevelsComponent levels (1 = low, 2 = medium, 3 = high)
 */

export const PRIORITY_LEVELS = [1, 2, 3] as const;
export type PriorityLevel = (typeof PRIORITY_LEVELS)[number];

/**
 * Available PriorityLevelsComponent sizes
 */

export const PRIORITY_LEVELS_SIZES = ['S', 'M', 'L'] as const;
export type PriorityLevelsSize = (typeof PRIORITY_LEVELS_SIZES)[number];
