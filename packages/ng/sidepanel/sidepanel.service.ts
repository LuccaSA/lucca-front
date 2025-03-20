import { ComponentType } from '@angular/cdk/overlay';
import { Injectable } from '@angular/core';
import { ILuModalContent, luDefaultSidepanelConfig, LuModal, LuModalConfig, LuModalContentResult } from '@lucca-front/ng/modal';
import { ILuSidepanelRef } from './sidepanel.model';

/**
 * @deprecated Use LuModal with `modal.open(component, data, { mode: 'sidepanel' })` instead.
 */
@Injectable()
export class LuSidepanel extends LuModal {
	protected override _config = luDefaultSidepanelConfig;

	/**
	 * @deprecated Use LuModal with `modal.open(component, data, { mode: 'sidepanel' })` instead.
	 */
	override open<T extends ILuModalContent, D>(component: ComponentType<T>, data: D = undefined, config: Partial<LuModalConfig> = {}): ILuSidepanelRef<D, LuModalContentResult<T>> {
		return super.open(component, data, config);
	}
}
