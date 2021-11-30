import { ILuPopupRefFactory } from '@lucca-front/ng/popup';
import { Overlay, ComponentType } from '@angular/cdk/overlay';
import { Injector, Injectable, ComponentRef, ChangeDetectionStrategy } from '@angular/core';
import { PortalOutlet, PortalInjector, ComponentPortal } from '@angular/cdk/portal';
import { ILuSidepanelContent } from './sidepanel.model';
import { ALuSidepanelRef, ILuSidepanelRef } from './sidepanel-ref.model';
import { LU_SIDEPANEL_DATA } from './sidepanel.token';
import { LuSidepanelPanelComponent, LuSidepanelPanelComponentDefaultCD } from './sidepanel-panel.component';
import { ILuSidepanelConfig } from './sidepanel-config.model';

class LuSidepanelRef<T extends ILuSidepanelContent = ILuSidepanelContent, D = any, R = any> extends ALuSidepanelRef<T, D, R> implements ILuSidepanelRef<T, D, R> {
	protected _containerRef: ComponentRef<LuSidepanelPanelComponent>;
	protected _containerOutlet: PortalOutlet;
	constructor(
		protected override _overlay: Overlay,
		protected override _injector: Injector,
		protected override _component: ComponentType<T>,
		protected override _config: ILuSidepanelConfig,
	) {
		super(_overlay, _injector, _component, _config);
	}
	protected override _openPopup(data?: D) {
		const injectionMap = new WeakMap();
		injectionMap.set(ALuSidepanelRef, this);
		injectionMap.set(LU_SIDEPANEL_DATA, data);
		const injector = new PortalInjector(this._injector, injectionMap);
		if (this._config.changeDetection === ChangeDetectionStrategy.OnPush) {
			const containerPortal = new ComponentPortal(LuSidepanelPanelComponent, undefined, injector);
			this._containerRef = this._overlayRef.attach<LuSidepanelPanelComponent>(containerPortal);
		} else {
			const containerPortal = new ComponentPortal(LuSidepanelPanelComponentDefaultCD, undefined, injector);
			this._containerRef = this._overlayRef.attach<LuSidepanelPanelComponent>(containerPortal);
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
export class LuSidepanelRefFactory implements ILuPopupRefFactory<ILuSidepanelContent, ILuSidepanelConfig> {
	constructor(
		protected _overlay: Overlay,
		protected _injector: Injector,
	) {}
	forge<T extends ILuSidepanelContent, C extends ILuSidepanelConfig>(component: ComponentType<T>, config: C) {
		return new LuSidepanelRef(this._overlay, this._injector, component, config);
	}
}
