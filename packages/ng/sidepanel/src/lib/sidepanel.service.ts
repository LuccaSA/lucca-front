import { ComponentType } from '@angular/cdk/overlay';
import { Inject, Injectable } from '@angular/core';
import { LuModal } from '@lucca-front/ng/modal';
import { ILuPopupRef, ILuPopupRefFactory } from '@lucca-front/ng/popup';
import { LuSidepanelConfig } from './sidepanel-config.model';
import { LU_SIDEPANEL_CONFIG, LU_SIDEPANEL_REF_FACTORY } from './sidepanel.token';

/**
 * @deprecated Use LuModal with `modal.open(component, data, { mode: 'sidepanel' })` instead.
 */
@Injectable()
export class LuSidepanel<C extends LuSidepanelConfig = LuSidepanelConfig> extends LuModal<C> {
	protected override _factory = inject(LU_SIDEPANEL_REF_FACTORY);
	protected override _config = inject<C>(LU_SIDEPANEL_CONFIG);

	/**
	 * @deprecated Use LuModal with `modal.open(component, data, { mode: 'sidepanel' })` instead.
	 */
	open<T, D, R>(component: ComponentType<T>, data: D = undefined, config: Partial<C> = {}): ILuPopupRef<T, D, R> {
		return super.open(component, data, config);
	}
}
