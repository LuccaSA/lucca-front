import { ComponentType, Overlay } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { ChangeDetectionStrategy, ComponentRef, Injectable, Injector } from '@angular/core';
import { ILuPopupRefFactory } from '@lucca-front/ng/popup';
import { ILuSidepanelConfig } from './sidepanel-config.model';
import { LuSidepanelPanelComponent, LuSidepanelPanelComponentDefaultCD } from './sidepanel-panel.component';
import { ALuSidepanelRef, ILuSidepanelRef } from './sidepanel-ref.model';
import { ILuSidepanelContent } from './sidepanel.model';
import { LU_SIDEPANEL_DATA } from './sidepanel.token';

class LuSidepanelRef<T extends ILuSidepanelContent<unknown> = ILuSidepanelContent<unknown>, D = unknown, R = unknown> extends ALuSidepanelRef<T, D, R> implements ILuSidepanelRef<T, D, R> {
	protected _containerRef: ComponentRef<LuSidepanelPanelComponent<T>>;
	constructor(protected override _overlay: Overlay, protected override _injector: Injector, protected override _component: ComponentType<T>, protected override _config: ILuSidepanelConfig) {
		super(_overlay, _injector, _component, _config);
	}
	protected override _openPopup(data?: D) {
		const injector = Injector.create({
			providers: [
				{ provide: ALuSidepanelRef, useValue: this },
				{ provide: LU_SIDEPANEL_DATA, useValue: data },
			],
			parent: this._injector,
		});
		if (this._config.changeDetection === ChangeDetectionStrategy.OnPush) {
			const containerPortal = new ComponentPortal<LuSidepanelPanelComponent<T>>(LuSidepanelPanelComponent, undefined, injector);
			this._containerRef = this._overlayRef.attach(containerPortal);
		} else {
			const containerPortal = new ComponentPortal<LuSidepanelPanelComponentDefaultCD<T>>(LuSidepanelPanelComponentDefaultCD, undefined, injector);
			this._containerRef = this._overlayRef.attach(containerPortal);
		}
		const panel = this._containerRef.instance;
		this._componentRef = panel.attachInnerComponent(this._component, injector);
	}
	protected override _closePopup() {
		this._componentRef.destroy();
		this._containerRef.destroy();
	}
}

@Injectable()
export class LuSidepanelRefFactory implements ILuPopupRefFactory<ILuSidepanelContent<unknown>, ILuSidepanelConfig> {
	constructor(protected _overlay: Overlay, protected _injector: Injector) {}
	forge<T extends ILuSidepanelContent<unknown>, C extends ILuSidepanelConfig, D, R>(component: ComponentType<T>, config: C) {
		return new LuSidepanelRef<T, D, R>(this._overlay, this._injector, component, config);
	}
}
