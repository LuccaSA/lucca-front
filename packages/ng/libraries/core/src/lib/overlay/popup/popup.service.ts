import { Injectable, Injector } from '@angular/core';
import { Overlay, OverlayRef, OverlayConfig } from '@angular/cdk/overlay';
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

	open(component, data = undefined) {
		const ref = new LuPopupRef(this._overlay, this._injector, component);
		ref.open(data);
		return ref;
	}
}
