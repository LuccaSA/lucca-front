/**
 * Available HorizontalNavigationComponent Types
 */

export const HORIZONTAL_NAVIGATION_SIZE = ['S'] as const;
export type HorizontalNavigationSize = (typeof HORIZONTAL_NAVIGATION_SIZE)[number];
