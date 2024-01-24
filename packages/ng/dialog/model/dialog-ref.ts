import { Observable } from 'rxjs';
import { LuDialogComponent } from './dialog-component';
import { InferredResult } from './types';
import { DialogRef } from '@angular/cdk/dialog';

export class LuDialogRef<C extends LuDialogComponent, R = InferredResult<C>> {
	/**
	 * Instance of the component that's inside the dialog
	 */
	instance: C = this.cdkRef.componentInstance as C;

	/**
	 * Emits when the dialog is closed, will emit a value if closed
	 */
	closed$: Observable<R | undefined> = this.cdkRef.closed as Observable<R | undefined>;

	constructor(private cdkRef: DialogRef) {}

	dismiss(): void {
		this.cdkRef.close();
	}

	close(res: R): void {
		this.cdkRef.close(res);
	}
}
