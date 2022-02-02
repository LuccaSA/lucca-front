import { ComponentType } from '@angular/cdk/overlay';
import { Inject, Injectable } from '@angular/core';
import { ILuPopupConfig } from './popup-config.model';
import { ILuPopupRef, ILuPopupRefFactory } from './popup-ref.model';
import { LU_POPUP_CONFIG, LU_POPUP_REF_FACTORY } from './popup.token';

// TODO WHAT THE HELL IS HAPPENING WITH THIS GENERICS MADNESS
// Send help

@Injectable()
export class LuPopup<C extends ILuPopupConfig = ILuPopupConfig> {
	constructor(@Inject(LU_POPUP_REF_FACTORY) protected _factory: ILuPopupRefFactory, @Inject(LU_POPUP_CONFIG) protected _config: ILuPopupConfig) {}

	open<T, D, R>(component: ComponentType<T>, data: D = undefined, config: C = {} as C): ILuPopupRef<T, D, R> {
		const extendedConfig = { ...this._config, ...config };
		const ref = this._factory.forge<T, C, D, R>(component, extendedConfig);
		ref.open(data);
		return ref;
	}
}
