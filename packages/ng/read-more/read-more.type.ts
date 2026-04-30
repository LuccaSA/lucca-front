/**
 * Available ReadMoreComponent Types
 */

export const READ_MORE_SURFACE = ['sunken', 'default'] as const;
export type ReadMoreSurface = (typeof READ_MORE_SURFACE)[number];
