/**
 * Available GridComponent types
 */

export const GRID_COLUMN_ALIGNMENT = ['start', 'center', 'end', 'auto'] as const;
export type GridColumnAlignment = (typeof GRID_COLUMN_ALIGNMENT)[number];

export const GRID_COLUMN_RESPONSIVE = ['row', 'column', 'rowspan', 'colspan'] as const;
export type GridColumnResponsive = (typeof GRID_COLUMN_RESPONSIVE)[number];
