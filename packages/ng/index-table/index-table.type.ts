/**
 * Available IndexTableComponent types
 */

export const INDEX_TABLE_ALIGN = ['start', 'center', 'end'] as const;
export type IndexTableAlign = (typeof INDEX_TABLE_ALIGN)[number];

export const INDEX_TABLE_SORT = ['none', 'ascending', 'descending'] as const;
export type IndexTableSort = (typeof INDEX_TABLE_SORT)[number];
