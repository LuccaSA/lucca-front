export interface FileEntry {
	name: string;
	/**
	 * File size in bytes. When `null`, the size is not displayed.
	 */
	size?: number | null;
	/**
	 * File MIME type. When `null`, the format is not displayed. When omitted, the format is deduced from the file name extension.
	 */
	type?: string | null;
	preview?: string;
}
