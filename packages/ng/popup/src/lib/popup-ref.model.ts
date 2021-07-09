import { Observable, Subject, Subscription, merge } from 'rxjs';
import { Overlay, OverlayRef, OverlayConfig } from '@angular/cdk/overlay';
import { ComponentPortal, PortalInjector, ComponentType } from '@angular/cdk/portal';
import { first, filter } from 'rxjs/operators';
import { ComponentRef } from '@angular/core';
import { ESCAPE } from '@angular/cdk/keycodes';
import { Injector } from '@angular/core';
import { LU_POPUP_DATA } from './popup.token';
import { ILuPopupConfig } from './popup-config.model';
import { ILuPopupContent } from './popup.model';

export interface ILuPopupRef<T extends ILuPopupContent = ILuPopupContent, D = any, R = any> {
	onOpen: Observable<D>;
	onClose: Observable<R>;
	onDismiss: Observable<void>;
	open(data: D): void;
	close(result: R): void;
	dismiss(): void;
}
export interface ILuPopupRefFactory<TComponent = any, TConfig extends ILuPopupConfig = ILuPopupConfig> {
	forge<T extends TComponent, C extends TConfig>(component: ComponentType<T>, config: C): ILuPopupRef<T>;
}

export abstract class ALuPopupRef<T extends ILuPopupContent = ILuPopupContent, D = any, R = any> implements ILuPopupRef<T, D, R> {
	onOpen = new Subject<D>();
	onClose = new Subject<R>();
	onDismiss = new Subject<void>();

	protected _overlayRef: OverlayRef;
	protected _componentRef: ComponentRef<T>;

	protected _subs = new Subscription();

	constructor(
		protected _overlay: Overlay,
		protected _injector: Injector,
		protected _component: ComponentType<T>,
		protected _config: ILuPopupConfig,
	) {}


	open(data?: D) {
		this._createOverlay();
		this._openPopup(data);

		this._subToCloseEvents();

		this.onOpen.next(data);
		this.onOpen.complete();
	}
	close(result?: R) {
		this.onClose.next(result);
		this._destroy();
	}
	dismiss() {
		this.onDismiss.next();
		this._destroy();
	}
	/**
	 *  This method creates the overlay from the provided popover's template and saves its
	 *  OverlayRef so that it can be attached to the DOM when openPopover is called.
	 */
	protected _createOverlay() {
		if (!this._overlayRef) {
			const overlayConfig = this._getOverlayConfig();
			this._overlayRef = this._overlay.create(overlayConfig);
		}
	}
		/**
	 * This method builds the configuration object needed to create the overlay, the OverlayConfig.
	 * @returns OverlayConfig
	 */
	protected _getOverlayConfig(): OverlayConfig {
		const overlayConfig = new OverlayConfig();
		switch (this._config.position) {
			case 'top':
				overlayConfig.positionStrategy =  this._overlay.position().global().centerHorizontally().top('0');
				break;
			case 'bottom':
				overlayConfig.positionStrategy =  this._overlay.position().global().centerHorizontally().bottom('0');
				break;
			case 'left':
				overlayConfig.positionStrategy =  this._overlay.position().global().centerVertically().left('0');
				break;
			case 'right':
				overlayConfig.positionStrategy =  this._overlay.position().global().centerVertically().right('0');
				break;

			case 'center':
			default:
				overlayConfig.positionStrategy =  this._overlay.position().global().centerHorizontally().centerVertically();
				break;
		}
		overlayConfig.hasBackdrop = !this._config.noBackdrop;
		overlayConfig.backdropClass = this._config.backdropClass;
		const panelClasses = [];
		if (Array.isArray(this._config.panelClass)) {
			panelClasses.push(...this._config.panelClass);
		} else {
			panelClasses.push(this._config.panelClass);
		}
		panelClasses.push(`size-${this._config.size}`);
		panelClasses.push(`position-${this._config.position}`);

		overlayConfig.panelClass = panelClasses;
		overlayConfig.scrollStrategy = this._overlay.scrollStrategies.block();
		return overlayConfig;
	}
	protected _openPopup(data?: D) {
		const injectionMap = new WeakMap();
		injectionMap.set(ALuPopupRef, this);
		injectionMap.set(LU_POPUP_DATA, data);
		const injector = new PortalInjector(this._injector, injectionMap);
		const portal = new ComponentPortal(this._component, undefined, injector);
		this._componentRef = this._overlayRef.attach<T>(portal);
	}

	protected _destroy() {
		this._cleanSubscription();
		this._closePopup();
		this._destroyOverlay();
		this._completeSubjects();

	}
	_completeSubjects() {
		this.onClose.complete();
		this.onOpen.complete();
		this.onDismiss.complete();
	}

	protected _destroyOverlay() {
		this._overlayRef.detachBackdrop();
		this._overlayRef.detach();
	}
	protected _closePopup() {
		this._componentRef.destroy();
	}
	protected _subToCloseEvents() {
		if (!this._config.undismissable) {

			const bdClicked$ = this._overlayRef.backdropClick();
			const escPressed$ = this._overlayRef.keydownEvents().pipe(
				filter(evt => evt.keyCode === ESCAPE),
			);
			const sub = merge(bdClicked$, escPressed$).pipe(first())
			.subscribe(e => this.dismiss());
			this._subs.add(sub);
		}
	}
	protected _cleanSubscription() {
		this._subs.unsubscribe();
	}
}
