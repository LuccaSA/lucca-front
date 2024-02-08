import { isObservable, Observable } from 'rxjs';
import { DialogRef } from '@angular/cdk/dialog';
import { LuDialogConfig, LuDialogResult } from './dialog-config';
import { filter, first, map } from 'rxjs/operators';

export const DISMISSED_VALUE = {} as const;

function isDismissed(v: unknown): v is typeof DISMISSED_VALUE {
	return v === DISMISSED_VALUE;
}

export class LuDialogRef<C> {
	/**
	 * Instance of the component that's inside the dialog
	 */
	get instance(): C {
		return this.cdkRef.componentInstance;
	}

	/**
	 * Emits when the dialog is closed, will emit a value if closed
	 */
	closed$: Observable<LuDialogResult<C> | undefined> = this.cdkRef.closed.pipe(map((res): LuDialogResult<C> | undefined => (isDismissed(res) ? undefined : res)));

	/**
	 * Emits void when the dialog is dismissed
	 */
	dismissed$: Observable<void> = this.cdkRef.closed.pipe(
		filter((res) => res === DISMISSED_VALUE),
		map((): void => undefined),
	);

	/**
	 * Emits the result if it has a value that's not DISMISSED_VALUE
	 */
	result$: Observable<LuDialogResult<C>> = this.cdkRef.closed.pipe(filter((res): res is LuDialogResult<C> => !isDismissed(res)));

	constructor(public readonly cdkRef: DialogRef<LuDialogResult<C> | typeof DISMISSED_VALUE, C>, private readonly config: LuDialogConfig<C>) {}

	dismiss(): void {
		if (this.config.canClose) {
			const canClose = this.config.canClose(this.instance);
			if (isObservable(canClose)) {
				canClose.pipe(first()).subscribe((close) => {
					if (close) {
						this.cdkRef.close(DISMISSED_VALUE);
					}
				});
			} else {
				if (canClose) {
					this.cdkRef.close(DISMISSED_VALUE);
				}
			}
		} else {
			this.cdkRef.close(DISMISSED_VALUE);
		}
	}

	close(res: LuDialogResult<C>): void {
		this.cdkRef.close(res);
	}
}

export type LuDialogSelfRef<R> = { dismiss(): void; close(res: R): void };
