import { Injectable, Injector } from '@angular/core';
import { Overlay, OverlayRef, OverlayConfig } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { LuPopupRef } from './popup-ref.model';

@Injectable()
export class LuPopup {
	protected _overlayRef: OverlayRef;
	protected _backdropSubscription: Subscription = new Subscription();
	constructor(
		protected _overlay: Overlay,
		protected _injector: Injector,
	) {}
	open(component) {
		this._createOverlay();
		this._openPopup(component);
	}

	openV2(component, data = undefined) {
		const ref = new LuPopupRef(this._overlay, this._injector, component);
		ref.open(data);
		return ref;
	}
	/**
	 * This method builds the configuration object needed to create the overlay, the OverlayConfig.
	 * @returns OverlayConfig
	 */
	protected _getOverlayConfig(): OverlayConfig {
		const overlayConfig = new OverlayConfig();
		overlayConfig.positionStrategy =  this._overlay.position().global().centerHorizontally().centerVertically();
		overlayConfig.hasBackdrop = true;
		overlayConfig.backdropClass = 'cdk-overlay-dark-backdrop';
		overlayConfig.panelClass = 'lu-popup-panel';
		overlayConfig.scrollStrategy = this._overlay.scrollStrategies.block();
		return overlayConfig;
	}
	/**
	 *  This method creates the overlay from the provided popover's template and saves its
	 *  OverlayRef so that it can be attached to the DOM when openPopover is called.
	 */
	protected _createOverlay() {
		if (!this._overlayRef) {

			const config = this._getOverlayConfig();
			this._overlayRef = this._overlay.create(config);
		}
	}
	protected _openPopup(component) {
		const portal = new ComponentPortal(component);
		const popupRef = this._overlayRef.attach(portal);
		this._overlayRef.backdropClick().pipe(
			first(),
		)
		.subscribe(c => {
			popupRef.destroy();
			this._overlayRef.detachBackdrop();
			this._overlayRef.detach();
		});
	}
}
