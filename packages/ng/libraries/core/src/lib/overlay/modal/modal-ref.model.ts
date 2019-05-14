import { Overlay } from '@angular/cdk/overlay';
import { ComponentPortal, PortalInjector, ComponentType, PortalOutlet } from '@angular/cdk/portal';
import { ComponentRef } from '@angular/core';
import { Injector } from '@angular/core';
import { LU_MODAL_DATA } from './modal.token';
import { ILuModalConfig } from './modal-config.model';
import { ILuPopupRef, LuPopupRef } from '../popup/index';
import { LuModalPanelComponent } from './modal-panel.component';

export interface ILuModalRef<T, D = any, R = any> extends ILuPopupRef<T, D, R> {}
export class LuModalRef<T, D = any, R = any> extends LuPopupRef<T, D, R> implements ILuModalRef<T, D, R> {
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
		injectionMap.set(LuModalRef, this);
		injectionMap.set(LU_MODAL_DATA, data);
		const injector = new PortalInjector(this._injector, injectionMap);
		const containerPortal = new ComponentPortal(LuModalPanelComponent, undefined, injector);
		this._containerRef = this._overlayRef.attach<LuModalPanelComponent>(containerPortal);
		this._containerOutlet = this._containerRef.instance.outlet;
		const portal = new ComponentPortal(this._component, undefined, injector);
		this._componentRef = this._containerOutlet.attach(portal) as ComponentRef<T>;
	}
	protected _closePopup() {
		this._componentRef.destroy();
		this._containerOutlet.detach();
		this._containerRef.destroy();
	}
}
