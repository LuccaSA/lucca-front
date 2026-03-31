/**
 * Available EmptyState Types
 */

export const EMPTY_STATE_HX = [1, 2, 3, 4, 5, 6] as const;
export type Hx = (typeof EMPTY_STATE_HX)[number];

export const EMPTY_STATE_HX_STYLE = [1, 2] as const;
export type HxStyle = (typeof EMPTY_STATE_HX_STYLE)[number];
