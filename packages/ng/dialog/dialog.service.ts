import { Dialog, DialogRef } from '@angular/cdk/dialog';
import { Overlay } from '@angular/cdk/overlay';
import { afterNextRender, inject, Injectable, Injector, Renderer2 } from '@angular/core';
import { isObservable, merge, of, take } from 'rxjs';
import { filter, switchMap, takeUntil } from 'rxjs/operators';
import { LuDialogConfig, LuDialogData, LuDialogRef, LuDialogResult } from './model';
import { DISMISSED_VALUE } from './model/dialog-ref';

@Injectable()
export class LuDialogService {
	#cdkDialog = inject(Dialog);

	#overlay = inject(Overlay);

	#injector = inject(Injector);

	open<C, TData = LuDialogData<C>>(config: LuDialogConfig<C, NoInfer<TData>>): LuDialogRef<C, TData> {
		// Assigned synchronously inside the `providers` callback below, which CDK calls during `Dialog.open()`.
		let luDialogRef!: LuDialogRef<C, TData>;
		let modeClasses: string[] = [];
		switch (config.mode) {
			case 'drawer':
				modeClasses = ['mod-drawer'];
				break;
			case 'fancy':
				modeClasses = ['mod-fancy'];
				break;
			case 'drawer-from-bottom':
				modeClasses = ['mod-drawer', 'mod-fromBottom'];
				break;
		}
		// Built explicitly (rather than left to CDK's default) so we can force a re-check below.
		const scrollStrategy = config.cdkConfigOverride?.scrollStrategy ?? this.#overlay.scrollStrategies.block();

		const cdkRef = this.#cdkDialog.open(config.content, {
			ariaModal: config.modal ?? true,
			hasBackdrop: config.modal ?? true,
			data: 'data' in config ? config.data : null,
			disableClose: true,
			closeOnDestroy: true,
			role: config.alert ? 'alertdialog' : 'dialog',
			restoreFocus: true,
			backdropClass: 'dialog_backdrop',
			panelClass: ['dialog', `mod-${config.size || 'M'}`, ...modeClasses, ...(config.surfaceDefault ? ['mod-surfaceDefault'] : []), ...(config.panelClasses || [])],

			ariaLabel: config.ariaLabel,
			// Handle manually
			closeOnOverlayDetachments: false,
			// If focus is first-input, focus dialog and let the component do the rest
			// Else, just set it to config value or default to first-tabbable
			autoFocus: config.autoFocus === 'first-input' ? 'dialog' : (config.autoFocus ?? 'first-tabbable'),
			templateContext: () => ({ dialogRef: luDialogRef }),
			injector: this.#injector,
			scrollStrategy,
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

		// Re-check once the view is stable: block strategy only locks scroll if the page already
		// overflows at attach time, which can miss for dialogs opened asynchronously (e.g. via a route).
		afterNextRender(() => scrollStrategy.enable(), { injector: this.#injector });

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
						const canClose = cdkRef.componentInstance ? (config.canClose?.(cdkRef.componentInstance) ?? true) : true;
						const canClose$ = isObservable(canClose) ? canClose : of(canClose);
						return canClose$.pipe(take(1));
					}),
					takeUntil(luDialogRef.closed$),
				)
				.subscribe((canClose) => {
					if (canClose) {
						luDialogRef.detachSubscription?.unsubscribe();
						cdkRef.close(DISMISSED_VALUE);
					}
				});
		}

		return luDialogRef;
	}
}
