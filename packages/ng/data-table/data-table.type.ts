/**
 * Available DataTableComponent Types
 */

export const DATA_TABLE_SORT = ['none', 'ascending', 'descending'] as const;
export type DataTableSort = (typeof DATA_TABLE_SORT)[number];

export const DATA_TABLE_VERTICAL_ALIGN = ['top', 'middle', 'bottom'] as const;
export type DataTableVerticalAlign = (typeof DATA_TABLE_VERTICAL_ALIGN)[number];

export const DATA_TABLE_ALIGN = ['start', 'center', 'end'] as const;
export type DataTableAlign = (typeof DATA_TABLE_ALIGN)[number];
