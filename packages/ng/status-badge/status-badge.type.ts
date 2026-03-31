/**
 * Available StatusBadgeComponent Sizes
 */

export const STATUS_BADGE_SIZE = ['L', 'M'] as const;
export type StatusBadgeSize = (typeof STATUS_BADGE_SIZE)[number];
