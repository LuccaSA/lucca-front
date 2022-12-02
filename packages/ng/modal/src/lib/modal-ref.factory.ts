import { ComponentType, Overlay } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { ApplicationRef, ChangeDetectionStrategy, ComponentRef, inject, Injectable, Injector } from '@angular/core';
import { ALuPopupRef, ILuPopupRefFactory } from '@lucca-front/ng/popup';
import { ILuModalConfig } from './modal-config.model';
import { ALuModalPanelComponent, LuModalPanelComponent, LuModalPanelComponentDefaultCD } from './modal-panel.component';
import { ALuModalRef, ILuModalRef } from './modal-ref.model';
import { ILuModalContent } from './modal.model';
import { LU_MODAL_DATA } from './modal.token';
import { setAriaHiddenOnApplicationRoot } from './modal.utils';

class LuModalRef<T extends ILuModalContent = ILuModalContent, D = unknown, R = unknown> extends ALuPopupRef<T, D, R> implements ILuModalRef<T, D, R> {
	protected _containerRef: ComponentRef<ALuModalPanelComponent<T>>;
	constructor(
		protected override _overlay: Overlay,
		protected override _injector: Injector,
		protected override _component: ComponentType<T>,
		protected override _config: ILuModalConfig,
		protected _applicationRef: ApplicationRef,
	) {
		super(_overlay, _injector, _component, _config);
	}
	protected override _openPopup(data?: D) {
		const injector = Injector.create({
			providers: [
				{ provide: ALuModalRef, useValue: this },
				{ provide: LU_MODAL_DATA, useValue: data },
			],
			parent: this._injector,
		});
		if (this._config.changeDetection === ChangeDetectionStrategy.OnPush) {
			const containerPortal = new ComponentPortal<ALuModalPanelComponent<T>>(LuModalPanelComponent, undefined, injector);
			this._containerRef = this._overlayRef.attach<ALuModalPanelComponent<T>>(containerPortal);
		} else {
			const containerPortal = new ComponentPortal<ALuModalPanelComponent<T>>(LuModalPanelComponentDefaultCD, undefined, injector);
			this._containerRef = this._overlayRef.attach<ALuModalPanelComponent<T>>(containerPortal);
		}
		const panel = this._containerRef.instance;
		this._componentRef = panel.attachInnerComponent(this._component, injector);
		setAriaHiddenOnApplicationRoot(this._applicationRef, true);
	}
	protected override _closePopup() {
		this._componentRef.destroy();
		this._containerRef.destroy();
		setAriaHiddenOnApplicationRoot(this._applicationRef, false);
	}
}

@Injectable()
export class LuModalRefFactory implements ILuPopupRefFactory<ILuModalContent, ILuModalConfig> {
	protected _applicationRef = inject(ApplicationRef);

	constructor(protected _overlay: Overlay, protected _injector: Injector) {}
	forge<T extends ILuModalContent, C extends ILuModalConfig, D, R>(component: ComponentType<T>, config: C) {
		return new LuModalRef<T, D, R>(this._overlay, this._injector, component, config, this._applicationRef);
	}
}
