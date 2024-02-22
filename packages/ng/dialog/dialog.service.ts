import { inject, Injectable } from '@angular/core';
import { LuDialogConfig, LuDialogRef, LuDialogResult } from './model';
import { Dialog, DialogRef } from '@angular/cdk/dialog';
import { isObservable, merge, of, take } from 'rxjs';
import { filter, switchMap, takeUntil } from 'rxjs/operators';
import { DISMISSED_VALUE } from './model/dialog-ref';

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
			panelClass: ['dialog', 'mod-drawer', 'mod-S'], //
			ariaLabel: config.ariaLabel,
			// If focus is first-input, focus dialog and let the component do the rest
			// Else, just set it to config value or default to first-tabbable
			autoFocus: config.autoFocus === 'first-input' ? 'dialog' : config.autoFocus ?? 'first-tabbable',
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

		if (config.dismissible !== false) {
			// Setup close listeners on backdrop click and escape key by ourselves so we can hook the `canClose` method to it.
			merge(cdkRef.backdropClick, cdkRef.keydownEvents.pipe(filter((e) => e.key === 'Escape' && !e.defaultPrevented)))
				.pipe(
					switchMap(() => {
						const canClose = config.canClose?.(cdkRef.componentInstance) ?? true;
						const canClose$ = isObservable(canClose) ? canClose : of(canClose);
						return canClose$.pipe(take(1));
					}),
					takeUntil(luDialogRef.closed$),
				)
				.subscribe((canClose) => {
					if (canClose) {
						cdkRef.close(DISMISSED_VALUE);
					}
				});
		}
		return luDialogRef;
	}
}
