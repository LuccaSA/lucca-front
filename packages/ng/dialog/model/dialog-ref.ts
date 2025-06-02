import { DialogRef } from '@angular/cdk/dialog';
import { isObservable, Observable, of, Subscription, take } from 'rxjs';
import { filter, map, takeUntil } from 'rxjs/operators';
import { LuDialogConfig, LuDialogResult } from './dialog-config';

export const DISMISSED_VALUE = {} as const;

function isDismissed(v: unknown): v is typeof DISMISSED_VALUE {
	return v === DISMISSED_VALUE;
}

export class LuDialogRef<C = unknown> {
	/**
	 * Instance of the component that's inside the dialog
	 */
	get instance(): C {
		return this.cdkRef.componentInstance;
	}

	/**
	 * Subscription to the detachments of the dialog
	 * This is used to close the dialog when it is detached
	 */
	detachSubscription: Subscription | null = null;

	/**
	 * Emits when the dialog is closed
	 *
	 * Emits either the output of result$ or undefined depending on how it has been closed
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

	constructor(
		public readonly cdkRef: DialogRef<LuDialogResult<C> | typeof DISMISSED_VALUE, C>,
		public readonly config: LuDialogConfig<C>,
	) {
		this.detachSubscription = cdkRef.overlayRef
			.detachments()
			.pipe(takeUntil(this.closed$))
			.subscribe(() => {
				cdkRef.close(DISMISSED_VALUE);
			});
	}

	dismiss(): void {
		// If we can't dismiss this dialog box, just ignore the dismiss call.
		if (this.config.alert) {
			return;
		}
		const canClose = this.config.canClose?.(this.instance) ?? true;
		const canClose$ = isObservable(canClose) ? canClose : of(canClose);
		canClose$.pipe(take(1)).subscribe((close) => {
			if (close) {
				this.detachSubscription?.unsubscribe();
				this.cdkRef.close(DISMISSED_VALUE);
			}
		});
	}

	close(res: LuDialogResult<C>): void {
		this.detachSubscription?.unsubscribe();
		this.cdkRef.close(res);
	}
}

export type LuDialogSelfRef<R> = { dismiss(): void; close(res: R): void };
