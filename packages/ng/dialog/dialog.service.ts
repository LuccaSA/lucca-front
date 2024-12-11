import { Dialog, DialogRef } from '@angular/cdk/dialog';
import { inject, Injectable, Injector, Renderer2 } from '@angular/core';
import { isObservable, merge, of, take } from 'rxjs';
import { filter, switchMap, takeUntil } from 'rxjs/operators';
import { LuDialogConfig, LuDialogRef, LuDialogResult } from './model';
import { DISMISSED_VALUE } from './model/dialog-ref';

@Injectable()
export class LuDialogService {
	#cdkDialog = inject(Dialog);

	#injector = inject(Injector);

	open<C>(config: LuDialogConfig<C>): LuDialogRef<C> {
		let luDialogRef: LuDialogRef<C>;
		let modeClasses: string[] = [];
		switch (config.mode) {
			case 'drawer':
				modeClasses = ['mod-drawer'];
				break;
			case 'drawer-from-bottom':
				modeClasses = ['mod-drawer', 'mod-fromBottom'];
				break;
		}
		const cdkRef = this.#cdkDialog.open(config.content, {
			ariaModal: config.modal ?? true,
			hasBackdrop: config.modal ?? true,
			data: 'data' in config ? config.data : null,
			disableClose: true,
			closeOnDestroy: true,
			role: config.alert ? 'alertdialog' : 'dialog',
			restoreFocus: true,
			backdropClass: 'dialog_backdrop',
			panelClass: ['dialog', `mod-${config.size || 'M'}`, ...modeClasses, ...(config.panelClasses || [])],
			ariaLabel: config.ariaLabel,
			// If focus is first-input, focus dialog and let the component do the rest
			// Else, just set it to config value or default to first-tabbable
			autoFocus: config.autoFocus === 'first-input' ? 'dialog' : (config.autoFocus ?? 'first-tabbable'),
			templateContext: () => ({ dialogRef: luDialogRef }),
			injector: this.#injector,
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

		if (cdkRef.componentRef) {
			const renderer = cdkRef.componentRef.injector.get(Renderer2);
			renderer.setStyle(cdkRef.componentRef.location.nativeElement, 'display', 'contents');
		}

		if (!config.alert) {
			// Setup close listeners on backdrop click and escape key by ourselves so we can hook the `canClose` method to it.
			merge(cdkRef.backdropClick, cdkRef.keydownEvents.pipe(filter((e) => e.key === 'Escape' && !e.defaultPrevented)))
				.pipe(
					filter(() => config.canCloseWithBackdrop ?? true),
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
