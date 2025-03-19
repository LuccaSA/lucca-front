import { ComponentType } from '@angular/cdk/overlay';
import { inject, Injectable } from '@angular/core';
import { ILuModalContent, LU_MODAL_CONFIG, LuModal, LuModalConfig, LuModalContentResult } from '@lucca-front/ng/modal';
import { ILuSidepanelRef } from './sidepanel.model';

/**
 * @deprecated Use LuModal with `modal.open(component, data, { mode: 'sidepanel' })` instead.
 */
@Injectable()
export class LuSidepanel extends LuModal {
	protected override _config = inject(LU_MODAL_CONFIG);

	/**
	 * @deprecated Use LuModal with `modal.open(component, data, { mode: 'sidepanel' })` instead.
	 */
	override open<T extends ILuModalContent, D>(component: ComponentType<T>, data: D = undefined, config: Partial<LuModalConfig> = {}): ILuSidepanelRef<D, LuModalContentResult<T>> {
		return super.open(component, data, config);
	}
}
