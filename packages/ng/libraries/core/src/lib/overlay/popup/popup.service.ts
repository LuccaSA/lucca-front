import { Injectable, Injector } from '@angular/core';
import { Overlay, OverlayRef, ComponentType } from '@angular/cdk/overlay';
import { Subscription } from 'rxjs';
import { LuPopupRef } from './popup-ref.model';

@Injectable()
export class LuPopup {
	protected _overlayRef: OverlayRef;
	protected _backdropSubscription: Subscription = new Subscription();
	constructor(
		protected _overlay: Overlay,
		protected _injector: Injector,
	) {}

	open<T, D, R>(component: ComponentType<T>, data: D = undefined) {
		const ref = new LuPopupRef<T, D, R>(this._overlay, this._injector, component);
		ref.open(data);
		return ref;
	}
}
