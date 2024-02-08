import { inject, Injectable } from '@angular/core';
import { LuDialogConfig, LuDialogRef, LuDialogResult } from './model';
import { Dialog, DialogRef } from '@angular/cdk/dialog';
import { isObservable, merge, of } from 'rxjs';
import { filter, first, switchMap } from 'rxjs/operators';

@Injectable()
export class LuDialogService {
	#cdkDialog = inject(Dialog);

	open<C>(config: LuDialogConfig<C>): LuDialogRef<C> {
		let luDialogRef: LuDialogRef<C>;
		const cdkRef = this.#cdkDialog.open(config.content, {
			ariaModal: true,
			hasBackdrop: config.backdrop ?? true,
			data: 'data' in config ? config.data : null,
			disableClose: true,
			closeOnDestroy: true,
			role: config.dismissible === false ? 'alertdialog' : 'dialog',
			restoreFocus: true,
			backdropClass: 'dialog_backdrop',
			panelClass: 'dialog',
			ariaLabel: config.ariaLabel,
			templateContext: () => ({ dialogRef: luDialogRef }),
			providers: (ref: DialogRef<LuDialogResult<C>, C>) => {
				luDialogRef = new LuDialogRef(ref, config);
				return [
					{
						provide: LuDialogRef,
						useValue: luDialogRef,
					},
				];
			},
			...(config.cdkConfigOverride || {}),
		});
		// Setup close listeners on backdrop click and escape key by ourselves so we can hook the `canClose` method to it.
		merge(cdkRef.backdropClick, cdkRef.keydownEvents.pipe(filter((e) => e.key === 'Escape' && !e.defaultPrevented)))
			.pipe(
				switchMap(() => {
					if (!config.dismissible) {
						return of(false);
					}
					if (config.canClose) {
						const canClose = config.canClose(cdkRef.componentInstance);
						if (isObservable(canClose)) {
							return canClose.pipe(first());
						}
						return of(canClose);
					}
					return of(true);
				}),
			)
			.subscribe((canClose) => {
				if (canClose) {
					cdkRef.close();
				}
			});
		return luDialogRef;
	}
}
