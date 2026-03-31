/**
 * Available file upload shared types
 */

export const FILE_UPLOAD_STATE = ['loading', 'success', 'error', 'default'] as const;
export type FileUploadState = (typeof FILE_UPLOAD_STATE)[number];

export const FILE_UPLOAD_SIZE = ['S'] as const;
export type FileUploadSize = (typeof FILE_UPLOAD_SIZE)[number];
