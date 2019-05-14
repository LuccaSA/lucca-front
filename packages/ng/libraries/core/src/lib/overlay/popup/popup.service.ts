import { Injectable, Injector, Inject } from '@angular/core';
import { Overlay, OverlayRef, ComponentType } from '@angular/cdk/overlay';
import { LuPopupRef } from './popup-ref.model';
import { LU_POPUP_CONFIG } from './popup.token';
import { ILuPopupConfig } from './popup-config.model';

@Injectable()
export class LuPopup {
	protected _overlayRef: OverlayRef;
	constructor(
		protected _overlay: Overlay,
		protected _injector: Injector,
		@Inject(LU_POPUP_CONFIG) protected _config: ILuPopupConfig,
	) {}

	open<T, D, R>(component: ComponentType<T>, data: D = undefined, config: ILuPopupConfig = {}) {
		const extendedConfig = { ...this._config, ...config };
		const ref = new LuPopupRef<T, D, R>(this._overlay, this._injector, component, extendedConfig);
		ref.open(data);
		return ref;
	}
}
