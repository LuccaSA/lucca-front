import { Observable } from 'rxjs';

export interface FileUploadService {
	upload(file: File): Observable<void>;

	confirm?(file: File): Observable<void>;

	cancel(file: File): Observable<void>;
}
