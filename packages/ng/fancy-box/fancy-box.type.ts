/**
 * Available FancyBoxComponent Types
 */

export const FANCY_BOX_SIZE = ['S'] as const;
export type FancyBoxSize = (typeof FANCY_BOX_SIZE)[number];
