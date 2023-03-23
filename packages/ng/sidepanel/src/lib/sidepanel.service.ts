import { ComponentType } from '@angular/cdk/overlay';
import { inject, Injectable } from '@angular/core';
import { ILuModalContent, LuModal } from '@lucca-front/ng/modal';
import { ILuSidepanelRef, LuSidepanelConfig, LU_SIDEPANEL_CONFIG } from './sidepanel.model';

/**
 * @deprecated Use LuModal with `modal.open(component, data, { mode: 'sidepanel' })` instead.
 */
@Injectable()
export class LuSidepanel extends LuModal {
	protected override _config = inject(LU_SIDEPANEL_CONFIG);

	/**
	 * @deprecated Use LuModal with `modal.open(component, data, { mode: 'sidepanel' })` instead.
	 */
	override open<T extends ILuModalContent<R>, D, R>(component: ComponentType<T>, data: D = undefined, config: Partial<LuSidepanelConfig> = {}): ILuSidepanelRef<T, D, R> {
		return super.open(component, data, config);
	}
}
