export interface FileUploadedEntry {
	file: File;
	state: 'loading' | 'success' | 'error';
	preview?: string;
}
