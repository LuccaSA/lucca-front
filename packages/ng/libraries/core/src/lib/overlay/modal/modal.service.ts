import { Injectable, Inject, Injector, ComponentRef } from '@angular/core';
import { ComponentType, Overlay } from '@angular/cdk/overlay';
import { LU_MODAL_CONFIG, LU_MODAL_DATA } from './modal.token';
import { ILuModalConfig } from './modal-config.model';
import { LuPopupRef } from '../popup/index';
import { ILuModalRef, ALuModalRef } from './modal-ref.model';
import { IModalContent } from './modal.model';
import { LuModalPanelComponent } from './modal-panel.component';
import { PortalOutlet, PortalInjector, ComponentPortal } from '@angular/cdk/portal';

export class LuModalRef<T extends IModalContent = IModalContent, D = any, R = any> extends LuPopupRef<T, D, R> implements ILuModalRef<T, D, R> {
	protected _containerRef: ComponentRef<LuModalPanelComponent>;
	protected _containerOutlet: PortalOutlet;
	constructor(
		protected _overlay: Overlay,
		protected _injector: Injector,
		protected _component: ComponentType<T>,
		protected _config: ILuModalConfig,
	) {
		super(_overlay, _injector, _component, _config);
	}
	protected _openPopup(data?: D) {
		const injectionMap = new WeakMap();
		injectionMap.set(ALuModalRef, this);
		injectionMap.set(LU_MODAL_DATA, data);
		const injector = new PortalInjector(this._injector, injectionMap);
		const containerPortal = new ComponentPortal(LuModalPanelComponent, undefined, injector);
		this._containerRef = this._overlayRef.attach<LuModalPanelComponent>(containerPortal);
		this._containerOutlet = this._containerRef.instance;
		const portal = new ComponentPortal(this._component, undefined, injector);
		this._componentRef = this._containerOutlet.attach(portal) as ComponentRef<T>;
	}
	protected _closePopup() {
		this._componentRef.destroy();
		this._containerRef.destroy();
	}
}


@Injectable()
export class LuModal {
	constructor(
		protected _overlay: Overlay,
		protected _injector: Injector,
		@Inject(LU_MODAL_CONFIG) protected _config: ILuModalConfig,
	) {}
	open<T extends IModalContent = IModalContent, D = any, R = any>(component: ComponentType<T>, data: D = undefined, config: ILuModalConfig = {}): ILuModalRef<T, D, R> {
		const extendedConfig = { ...this._config, ...config };
		const ref = new LuModalRef<T, D, R>(this._overlay, this._injector, component, extendedConfig) as ILuModalRef<T, D, R>;
		ref.open(data);
		return ref;
	}
}
