import { Injectable, Injector, Inject } from '@angular/core';
import { Overlay, OverlayRef, ComponentType } from '@angular/cdk/overlay';
import { ALuPopupRef, ILuPopupRef } from './popup-ref.model';
import { LU_POPUP_CONFIG } from './popup.token';
import { ILuPopupConfig } from './popup-config.model';
import { IPopupContent } from './popup.model';

export class LuPopupRef<T extends IPopupContent = IPopupContent, D = any, R = any> extends ALuPopupRef<T, D, R> {
	constructor(
		protected _overlay: Overlay,
		protected _injector: Injector,
		protected _component: ComponentType<T>,
		protected _config: ILuPopupConfig,
	) {
		super (_overlay, _injector, _component, _config);
	}
}

@Injectable()
export class LuPopup {
	constructor(
		protected _overlay: Overlay,
		protected _injector: Injector,
		@Inject(LU_POPUP_CONFIG) protected _config: ILuPopupConfig,
	) {}

	open<T extends IPopupContent = IPopupContent, D = any, R = any>(component: ComponentType<T>, data: D = undefined, config: ILuPopupConfig = {}): ILuPopupRef<T, D, R> {
		const extendedConfig = { ...this._config, ...config };
		const ref = new LuPopupRef<T, D, R>(this._overlay, this._injector, component, extendedConfig) as ILuPopupRef<T, D, R>;
		ref.open(data);
		return ref;
	}
}
