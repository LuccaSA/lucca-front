import { ILuPopupContent } from './popup.model';
import { ALuPopupRef, ILuPopupRefFactory } from './popup-ref.model';
import { Overlay, ComponentType } from '@angular/cdk/overlay';
import { Injector, Injectable } from '@angular/core';
import { ILuPopupConfig } from './popup-config.model';

export class LuPopupRef<
	T extends ILuPopupContent = ILuPopupContent,
	D = any,
	R = any,
> extends ALuPopupRef<T, D, R> {
	constructor(
		protected override _overlay: Overlay,
		protected override _injector: Injector,
		protected override _component: ComponentType<T>,
		protected override _config: ILuPopupConfig,
	) {
		super(_overlay, _injector, _component, _config);
	}
}

@Injectable()
export class LuPopupRefFactory implements ILuPopupRefFactory {
	constructor(protected _overlay: Overlay, protected _injector: Injector) {}
	forge<T>(component: ComponentType<T>, config: ILuPopupConfig) {
		return new LuPopupRef(this._overlay, this._injector, component, config);
	}
}
