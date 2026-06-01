/**
 * Available TagComponent Types
 */

export const TAG_SIZE = ['S', 'M', 'L'] as const;
export type TagSize = (typeof TAG_SIZE)[number];
