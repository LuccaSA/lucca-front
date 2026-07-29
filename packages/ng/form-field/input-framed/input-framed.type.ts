/**
 * Available InputFramedComponent sizes
 */

export const INPUT_FRAMED_SIZE = ['L'] as const;
export type InputFramedSize = (typeof INPUT_FRAMED_SIZE)[number];
