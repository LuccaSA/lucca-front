/**
 * Available FileEntryComponent Types
 */

export const FILE_ENTRY_STATE = ['success', 'loading', 'error', 'default'] as const;
export type FileEntryState = (typeof FILE_ENTRY_STATE)[number];

export const FILE_ENTRY_SIZE = ['L'] as const;
export type FileEntrySize = (typeof FILE_ENTRY_SIZE)[number];
