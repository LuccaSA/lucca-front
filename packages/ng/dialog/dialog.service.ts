import { inject, Injectable } from '@angular/core';
import { InferredResult, LuDialogComponent, LuDialogRef } from './model';
import { LuDialogConfig } from './model/dialog-config';
import { Dialog } from '@angular/cdk/dialog';

@Injectable()
export class LuDialogService {
	#cdkDialog = inject(Dialog);

	open<C extends LuDialogComponent>(config: LuDialogConfig<C>): LuDialogRef<C, InferredResult<C>> {
		const cdkRef = this.#cdkDialog.open(config.component, {
			data: config.dialogData,
			ariaModal: true,
			hasBackdrop: config.backdrop ?? true,
			closeOnDestroy: true,
			restoreFocus: true,
		});

		Object.assign(cdkRef.componentInstance, config.dialogData || {});
		return new LuDialogRef(cdkRef);
	}
}
