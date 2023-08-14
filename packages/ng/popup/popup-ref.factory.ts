import { ComponentType, Overlay } from '@angular/cdk/overlay';
import { Injectable, Injector } from '@angular/core';
import { ILuPopupConfig } from './popup-config.model';
import { ALuPopupRef, ILuPopupRefFactory } from './popup-ref.model';

export class LuPopupRef<T = unknown, D = unknown, R = unknown> extends ALuPopupRef<T, D, R> {
	constructor(protected override _overlay: Overlay, protected override _injector: Injector, protected override _component: ComponentType<T>, protected override _config: ILuPopupConfig) {
		super(_overlay, _injector, _component, _config);
	}
}

@Injectable()
export class LuPopupRefFactory implements ILuPopupRefFactory {
	constructor(protected _overlay: Overlay, protected _injector: Injector) {}
	forge<T, D, R>(component: ComponentType<T>, config: ILuPopupConfig) {
		return new LuPopupRef<T, D, R>(this._overlay, this._injector, component, config);
	}
}
