import { Injectable } from '@angular/core';
import { FileUploadService } from './file-upload.service';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
	providedIn: 'root',
})
export class FileUploadTestService implements FileUploadService {
	upload(_file: File): Observable<void> {
		// Delay fake upload by 1s to 3s
		return of(void 0).pipe(delay(1000 + Math.random() * 2000));
	}

	confirm?(_file: File): Observable<void> {
		// Delay fake upload by 1s to 3s
		return of(void 0).pipe(delay(1000 + Math.random() * 2000));
	}

	cancel(_file: File): Observable<void> {
		// Delay fake upload by 1s to 3s
		return of(void 0).pipe(delay(1000 + Math.random() * 2000));
	}
}
