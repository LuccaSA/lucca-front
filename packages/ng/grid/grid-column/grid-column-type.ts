/**
 * Available GridColumnComponent alignments
 */

export const GRID_COLUMN_ALIGNMENT = ['start', 'center', 'end', 'auto'] as const;
export type GridColumnAlignment = (typeof GRID_COLUMN_ALIGNMENT)[number];
