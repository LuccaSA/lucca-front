import { ComponentType } from '@angular/cdk/portal';
import { inject, Injectable } from '@angular/core';
import { LuModalConfig } from './modal-config.model';
import { ILuModalRef } from './modal-ref.model';
import { ILuModalContent, LuModalContentResult } from './modal.model';
import { LU_MODAL_CONFIG, LU_MODAL_REF_FACTORY } from './modal.token';

@Injectable()
export class LuModal {
	protected _factory = inject(LU_MODAL_REF_FACTORY);
	protected _config = inject(LU_MODAL_CONFIG);

	open<T extends ILuModalContent, D>(component: ComponentType<T>, data: D = undefined, config: Partial<LuModalConfig> = {}): ILuModalRef<D, LuModalContentResult<T>> {
		const extendedConfig = { ...this._config, ...config } as LuModalConfig;
		const ref = this._factory.forge<T, LuModalConfig, D>(component, extendedConfig);
		ref.open(data);
		return ref;
	}
}
