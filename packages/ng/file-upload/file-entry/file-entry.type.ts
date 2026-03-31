/**
 * Available FileEntryComponent Types
 */

export const FILE_ENTRY_STATE = ['success', 'loading', 'error', 'default'] as const;
export type FileEntryState = (typeof FILE_ENTRY_STATE)[number];

export const FILE_ENTRY_SIZE = ['S'] as const;
export type FileEntrySize = (typeof FILE_ENTRY_SIZE)[number];
