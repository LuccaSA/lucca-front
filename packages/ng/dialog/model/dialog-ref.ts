import { Observable } from 'rxjs';
import { DialogRef } from '@angular/cdk/dialog';
import { LuDialogResult } from './dialog-config';

export class LuDialogRef<C> {
	/**
	 * Instance of the component that's inside the dialog
	 */
	instance: C = this.cdkRef.componentInstance;

	/**
	 * Emits when the dialog is closed, will emit a value if closed
	 */
	closed$: Observable<LuDialogResult<C> | undefined> = this.cdkRef.closed;

	constructor(public readonly cdkRef: DialogRef<LuDialogResult<C>, C>) {}

	dismiss(): void {
		this.cdkRef.close();
	}

	close(res: LuDialogResult<C>): void {
		this.cdkRef.close(res);
	}
}

export type LuDialogSelfRef<R> = { dismiss(): void; close(res: R): void };
