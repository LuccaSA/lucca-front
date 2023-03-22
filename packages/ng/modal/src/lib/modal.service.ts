import { ComponentType } from '@angular/cdk/portal';
import { inject, Injectable } from '@angular/core';
import { LuModalConfig } from './modal-config.model';
import { ILuModalRef } from './modal-ref.model';
import { ILuModalContent } from './modal.model';
import { LU_MODAL_CONFIG, LU_MODAL_REF_FACTORY } from './modal.token';

@Injectable()
export class LuModal {
	protected _factory = inject(LU_MODAL_REF_FACTORY);
	protected _config = inject(LU_MODAL_CONFIG);

	open<T extends ILuModalContent<R>, D, R>(component: ComponentType<T>, data: D = undefined, config: Partial<LuModalConfig> = {}): ILuModalRef<T, D, R> {
		const extendedConfig = { ...this._config, ...config } as LuModalConfig;
		const ref = this._factory.forge<T, LuModalConfig, D, T extends ILuModalContent<infer R> ? R : unknown>(component, extendedConfig);
		ref.open(data);
		return ref;
	}
}
