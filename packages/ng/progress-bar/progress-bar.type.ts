/**
 * Available ProgressBarComponent Types
 */

export const PROGRESS_BAR_STATE = ['success', 'error'] as const;
export type ProgressBarState = (typeof PROGRESS_BAR_STATE)[number];
