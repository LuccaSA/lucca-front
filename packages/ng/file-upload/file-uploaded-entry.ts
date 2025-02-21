export interface FileUploadedEntry {
	file: File;
	state: 'loading' | 'success' | 'critical';
	preview?: string;
}
