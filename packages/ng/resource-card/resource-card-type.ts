/**
 * Available ResourceCard types
 */

export const RESOURCE_CARD_HEADING_LEVEL = ['1', '2', '3', '4', '5', '6'] as const;
export type ResourceCardHeadingLevel = (typeof RESOURCE_CARD_HEADING_LEVEL)[number];

export const RESOURCE_CARD_SIZE = ['S'] as const;
export type ResourceCardSize = (typeof RESOURCE_CARD_SIZE)[number];
