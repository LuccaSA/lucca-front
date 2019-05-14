import { Injectable, Inject, Injector } from '@angular/core';
import { ComponentType, Overlay } from '@angular/cdk/overlay';
import { LU_MODAL_CONFIG } from './modal.token';
import { ILuModalConfig } from './modal-config.model';
import { LuPopup } from '../popup/index';
import { LuModalRef, ILuModalRef } from './modal-ref.model';

@Injectable()
export class LuModal extends LuPopup {
	constructor(
		protected _overlay: Overlay,
		protected _injector: Injector,
		@Inject(LU_MODAL_CONFIG) protected _config: ILuModalConfig,
	) {
		super(_overlay, _injector, _config);
	}
	open<T, D, R>(component: ComponentType<T>, data: D = undefined, config: ILuModalConfig = {}): ILuModalRef<T, D, R> {
		const extendedConfig = { ...this._config, ...config };
		const ref = new LuModalRef<T, D, R>(this._overlay, this._injector, component, extendedConfig) as ILuModalRef<T, D, R>;
		ref.open(data);
		return ref;
	}
}
