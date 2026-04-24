import { ResponsiveProperty } from '@lucca-front/ng/core';

/**
 * Available GridComponent Types
 */
export const GRID_MODE = ['form', 'auto'] as const;
export type GridMode = (typeof GRID_MODE)[number] | ResponsiveProperty<'auto'>;
