/**
 * Available API select standards
 */

export const API_SELECT_STANDARD = ['v3', 'v4'] as const;
export type ApiSelectStandard = (typeof API_SELECT_STANDARD)[number];
