/**
 * Available ColorComponent Types
 */

export const COLOR_SIZE = ['L', 'XL'] as const;
export type ColorSize = (typeof COLOR_SIZE)[number];
