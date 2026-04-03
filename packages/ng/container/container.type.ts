/**
 * Available ContainerComponent Types
 */

export const CONTAINER_SIZE = ['M', 'L', 'XL', 'XXL', 'XXXL'] as const;
export type ContainerSize = (typeof CONTAINER_SIZE)[number];
