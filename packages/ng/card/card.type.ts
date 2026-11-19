/**
 * Available Card Types
 */

export const CARD_HEADING_LEVEL = [1, 2, 3, 4, 5, 6] as const;
export type CardHeadingLevel = (typeof CARD_HEADING_LEVEL)[number];

export const CARD_SIZE = ['S'] as const;
export type CardSize = (typeof CARD_SIZE)[number];
