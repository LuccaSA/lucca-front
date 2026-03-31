/**
 * Available DividerComponent Types
 */

export const DIVIDER_SIZE = ['M', 'S'] as const;
export type DividerSize = (typeof DIVIDER_SIZE)[number];
