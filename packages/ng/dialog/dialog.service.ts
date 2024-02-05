import { inject, Injectable } from '@angular/core';
import { LuDialogConfig, LuDialogRef, LuDialogResult } from './model';
import { Dialog, DialogRef } from '@angular/cdk/dialog';

@Injectable()
export class LuDialogService {
	#cdkDialog = inject(Dialog);

	open<C>(config: LuDialogConfig<C>): LuDialogRef<C> {
		let luDialogRef: LuDialogRef<C>;
		this.#cdkDialog.open(config.component, {
			ariaModal: true,
			hasBackdrop: config.backdrop ?? true,
			data: 'data' in config ? config.data : null,
			disableClose: config.dismissible === false,
			closeOnDestroy: true,
			role: 'dialog',
			restoreFocus: true,
			backdropClass: 'backdrop-dialog',
			panelClass: 'dialog',
			ariaLabel: config.ariaLabel,
			templateContext: () => ({ dialogRef: luDialogRef }),
			providers: (ref: DialogRef<LuDialogResult<C>, C>) => {
				luDialogRef = new LuDialogRef(ref);
				return [
					{
						provide: LuDialogRef,
						useValue: luDialogRef,
					},
				];
			},
			...(config.cdkConfigOverride || {}),
		});
		return luDialogRef;
	}
}
