import { ComponentType } from '@angular/cdk/overlay';
import { inject, Injectable } from '@angular/core';
import { ILuPopupConfig } from './popup-config.model';
import { ILuPopupRef } from './popup-ref.model';
import { LU_POPUP_CONFIG, LU_POPUP_REF_FACTORY } from './popup.token';

@Injectable()
export class LuPopup<C extends ILuPopupConfig = ILuPopupConfig> {
	protected _factory = inject(LU_POPUP_REF_FACTORY);
	protected _config = inject(LU_POPUP_CONFIG);

	open<T, D, R>(component: ComponentType<T>, data: D = undefined, config: C = {} as C): ILuPopupRef<T, D, R> {
		const extendedConfig = { ...this._config, ...config };
		const ref = this._factory.forge<T, C, D, R>(component, extendedConfig);
		ref.open(data);
		return ref;
	}
}
