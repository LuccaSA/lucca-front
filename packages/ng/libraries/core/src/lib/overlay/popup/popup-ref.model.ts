import { Observable, Subject, Subscription, merge } from 'rxjs';
import { Overlay, OverlayRef, OverlayConfig } from '@angular/cdk/overlay';
import { ComponentPortal, PortalInjector } from '@angular/cdk/portal';
import { first, filter } from 'rxjs/operators';
import { ComponentRef } from '@angular/core/src/render3';
import { ESCAPE } from '@angular/cdk/keycodes';
import { Injector } from '@angular/core';

export interface ILuPopupRef {
	onOpen: Observable<void>;
	onClose: Observable<void>;
	open(): void;
	close(): void;
}
export class LuPopupRef {
	onOpen = new Subject<void>();
	onClose = new Subject<void>();

	protected _overlayRef: OverlayRef;
	protected _componentRef: ComponentRef<any>;

	protected _sub: Subscription;
	constructor(
		protected _overlay: Overlay,
		protected _injector: Injector,
		protected _component,
	) {}

	open() {
		this._overlayRef = this._createOverlay();
		this._componentRef = this._openPopup();
		this._sub = this._subToCloseEvents();

		this.onOpen.next();
		this.onOpen.complete();
	}
	close() {
		this._cleanSubscription();
		this._closePopup();
		this._destroyOverlay();

		this.onClose.next();
		this.onClose.complete();
	}

	/**
	 *  This method creates the overlay from the provided popover's template and saves its
	 *  OverlayRef so that it can be attached to the DOM when openPopover is called.
	 */
	protected _createOverlay(): OverlayRef {
		if (!this._overlayRef) {
			const config = this._getOverlayConfig();
			return this._overlay.create(config);
		}
		return this._overlayRef;
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
	protected _openPopup(): ComponentRef<any> {
		const injector = new PortalInjector(this._injector, new WeakMap([
			[LuPopupRef, this]
		]))
		const portal = new ComponentPortal(this._component, undefined, injector);
		const componentRef = this._overlayRef.attach(portal);
		return <any>componentRef;
	}

	protected _destroyOverlay() {
		this._overlayRef.detachBackdrop();
		this._overlayRef.detach();
	}
	protected _closePopup() {
		this._componentRef.destroy();
	}
	protected _subToCloseEvents() {
		const bdClicked$ = this._overlayRef.backdropClick();
		const escPressed$ = this._overlayRef.keydownEvents().pipe(
			filter(evt => evt.keyCode === ESCAPE),
		);
		return merge(bdClicked$, escPressed$).pipe(first())
		.subscribe(e => this.close());
	}
	protected _cleanSubscription() {
		this._sub.unsubscribe();
	}
}
