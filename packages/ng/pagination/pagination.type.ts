/**
 * Available PaginationComponent Mods
 */

export const PAGINATION_MOD = ['default', 'compact'] as const;
export type PaginationMod = (typeof PAGINATION_MOD)[number];
