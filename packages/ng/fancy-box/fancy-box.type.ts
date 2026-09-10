/**
 * Available FancyBoxComponent Types
 */

export const FANCY_BOX_SIZE = ['S'] as const;
export type FancyBoxSize = (typeof FANCY_BOX_SIZE)[number];

export const FANCY_BOX_BACKGROUND_END_START = ['bubbles', 'plant'] as const;
export type FancyBoxBackgroundEndStart = (typeof FANCY_BOX_BACKGROUND_END_START)[number];

export const FANCY_BOX_BACKGROUND_START_END = ['bubbles', 'candies'] as const;
export type FancyBoxBackgroundStartEnd = (typeof FANCY_BOX_BACKGROUND_START_END)[number];

export const FANCY_BOX_FOREGROUND_END_START = ['clips'] as const;
export type FancyBoxForegroundEndStart = (typeof FANCY_BOX_FOREGROUND_END_START)[number];

export const FANCY_BOX_FOREGROUND_START_END = ['pizza'] as const;
export type FancyBoxForegroundStartEnd = (typeof FANCY_BOX_FOREGROUND_START_END)[number];
