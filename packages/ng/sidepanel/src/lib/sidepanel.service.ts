import { ComponentType } from '@angular/cdk/overlay';
import { inject, Injectable } from '@angular/core';
import { LuModal } from '@lucca-front/ng/modal';
import { ILuPopupRef } from '@lucca-front/ng/popup';
import { LuSidepanelConfig, LU_SIDEPANEL_CONFIG } from './sidepanel.model';

/**
 * @deprecated Use LuModal with `modal.open(component, data, { mode: 'sidepanel' })` instead.
 */
@Injectable()
export class LuSidepanel<C extends LuSidepanelConfig = LuSidepanelConfig> extends LuModal<C> {
	protected override _config = inject<C>(LU_SIDEPANEL_CONFIG);

	/**
	 * @deprecated Use LuModal with `modal.open(component, data, { mode: 'sidepanel' })` instead.
	 */
	override open<T, D, R>(component: ComponentType<T>, data: D = undefined, config: Partial<C> = {}): ILuPopupRef<T, D, R> {
		return super.open(component, data, config);
	}
}
