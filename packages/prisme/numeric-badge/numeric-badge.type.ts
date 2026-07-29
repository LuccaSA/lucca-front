/**
 * Available NumericBadgeComponent Types
 */

export const NUMERIC_BADGE_SIZE = ['XS', 'S', 'M'] as const;
export type NumericBadgeSize = (typeof NUMERIC_BADGE_SIZE)[number];
