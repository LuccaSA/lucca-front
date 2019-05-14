import { Injectable, Inject } from '@angular/core';
import { ComponentType } from '@angular/cdk/overlay';
import { LU_MODAL_CONFIG } from './modal.token';
import { ILuModalConfig } from './modal-config.model';
import { LuPopup } from '../popup/index';
import { LuModalPanelComponent } from './modal-panel.component';

@Injectable()
export class LuModal {
	constructor(
		protected _popup: LuPopup,
		@Inject(LU_MODAL_CONFIG) protected _config: ILuModalConfig,
	) {}

	open<T, D, R>(component: ComponentType<T>, data: D = undefined, config: ILuModalConfig = {}) {
		const extendedConfig = { ...this._config, ...config };
		return this._popup.open(LuModalPanelComponent, data, extendedConfig);
	}
}
