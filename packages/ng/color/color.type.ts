/**
 * Available ColorComponent Sizes
 */

export const COLOR_SIZE = ['L', 'XL'] as const;
export type ColorSize = (typeof COLOR_SIZE)[number];
