/**
 * Available LoadingComponent Types
 */

export const LOADING_SIZE = ['L'] as const;
export type LoadingSize = (typeof LOADING_SIZE)[number];
