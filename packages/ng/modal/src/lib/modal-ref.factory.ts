import { ALuPopupRef, ILuPopupRefFactory } from '@lucca-front/ng/popup';
import { Overlay, ComponentType } from '@angular/cdk/overlay';
import { Injector, Injectable, ComponentRef, ChangeDetectionStrategy } from '@angular/core';
import { ILuModalContent } from './modal.model';
import { ILuModalRef, ALuModalRef } from './modal-ref.model';
import { LuModalPanelComponent, LuModalPanelComponentDefaultCD } from './modal-panel.component';
import { PortalOutlet, PortalInjector, ComponentPortal } from '@angular/cdk/portal';
import { ILuModalConfig } from './modal-config.model';
import { LU_MODAL_DATA } from './modal.token';

class LuModalRef<T extends ILuModalContent = ILuModalContent, D = any, R = any> extends ALuPopupRef<T, D, R> implements ILuModalRef<T, D, R> {
	protected _containerRef: ComponentRef<LuModalPanelComponent>;
	protected _containerOutlet: PortalOutlet;
	constructor(
		protected override _overlay: Overlay,
		protected override _injector: Injector,
		protected override _component: ComponentType<T>,
		protected override _config: ILuModalConfig,
	) {
		super(_overlay, _injector, _component, _config);
	}
	protected override _openPopup(data?: D) {
		const injectionMap = new WeakMap();
		injectionMap.set(ALuModalRef, this);
		injectionMap.set(LU_MODAL_DATA, data);
		const injector = new PortalInjector(this._injector, injectionMap);
		if (this._config.changeDetection === ChangeDetectionStrategy.OnPush) {
			const containerPortal = new ComponentPortal(LuModalPanelComponent, undefined, injector);
			this._containerRef = this._overlayRef.attach<LuModalPanelComponent>(containerPortal);
		} else {
			const containerPortal = new ComponentPortal(LuModalPanelComponentDefaultCD, undefined, injector);
			this._containerRef = this._overlayRef.attach<LuModalPanelComponent>(containerPortal);
		}
		this._containerOutlet = this._containerRef.instance;
		const portal = new ComponentPortal(this._component, undefined, injector);
		this._componentRef = this._containerOutlet.attach(portal) as ComponentRef<T>;
	}
	protected override _closePopup() {
		this._componentRef.destroy();
		this._containerRef.destroy();
	}
}

@Injectable()
export class LuModalRefFactory implements ILuPopupRefFactory<ILuModalContent, ILuModalConfig> {
	constructor(
		protected _overlay: Overlay,
		protected _injector: Injector,
	) {}
	forge<T extends ILuModalContent, C extends ILuModalConfig>(component: ComponentType<T>, config: C) {
		return new LuModalRef(this._overlay, this._injector, component, config);
	}
}
