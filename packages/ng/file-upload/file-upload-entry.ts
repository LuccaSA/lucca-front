export interface FileEntry {
	name: string;
	size: number;
	type: string;
	state: 'default' | 'loading' | 'success' | 'error';
	preview?: string;
}

export interface UploadEntry extends FileEntry {
	file?: File;
}
