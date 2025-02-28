export interface FileUploadEntry {
	file?: File;
	name: string;
	size: number;
	type: string;
	state: 'default' | 'loading' | 'success' | 'error';
	preview?: string;
}
