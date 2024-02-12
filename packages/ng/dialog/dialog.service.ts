import { ElementRef, inject, Injectable } from '@angular/core';
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
			panelClass: 'dialog',
			ariaLabel: config.ariaLabel,
			autoFocus: 'dialog',
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

		if (!config.cdkConfigOverride?.autoFocus) {
			const componentHTMLElement = cdkRef.componentRef.injector.get<ElementRef<HTMLElement>>(ElementRef)?.nativeElement;
			const focusable: HTMLElement =
				componentHTMLElement.querySelector('.luDialog-autofocus .luNativeInput') || componentHTMLElement.querySelector('.luDialog-autofocus') || componentHTMLElement.querySelector('.luNativeInput');
			focusable?.focus();
		}
		// Setup close listeners on backdrop click and escape key by ourselves so we can hook the `canClose` method to it.
		merge(cdkRef.backdropClick, cdkRef.keydownEvents.pipe(filter((e) => e.key === 'Escape' && !e.defaultPrevented)))
			.pipe(
				switchMap(() => {
					if (config.dismissible === false) {
						return of(false);
					}
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
		return luDialogRef;
	}
}
