import { Injectable, Inject } from '@angular/core';
import { ComponentType } from '@angular/cdk/overlay';
import { ILuPopupRef, ILuPopupRefFactory } from './popup-ref.model';
import { LU_POPUP_CONFIG, LU_POPUP_REF_FACTORY } from './popup.token';
import { ILuPopupConfig } from './popup-config.model';
import { ILuPopupContent } from './popup.model';

@Injectable()
export class LuPopup<C extends ILuPopupConfig = ILuPopupConfig> {
	constructor(@Inject(LU_POPUP_REF_FACTORY) protected _factory: ILuPopupRefFactory, @Inject(LU_POPUP_CONFIG) protected _config: ILuPopupConfig) {}

	open<T extends ILuPopupContent = ILuPopupContent, D = any, R = any>(component: ComponentType<T>, data: D = undefined, config: C = {} as any): ILuPopupRef<T, D, R> {
		const extendedConfig = { ...this._config, ...config };
		const ref = this._factory.forge(component, extendedConfig);
		ref.open(data);
		return ref;
	}
}
