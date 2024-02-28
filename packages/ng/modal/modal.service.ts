import { ComponentType } from '@angular/cdk/portal';
import { inject, Injectable } from '@angular/core';
import { LuModalConfig } from './modal-config.model';
import { ILuModalRef } from './modal-ref.model';
import { ILuModalContent, LuModalContentResult } from './modal.model';
import { LU_MODAL_CONFIG, LU_MODAL_REF_FACTORY } from './modal.token';
import { LuDialogConfig, LuDialogService } from '@lucca-front/ng/dialog';
import { DialogRefAdapter } from './dialog-adapter/dialog-ref-adapter';
import { DialogContentAdapterComponent } from './dialog-adapter/dialog-content-adapter/dialog-content-adapter.component';

@Injectable()
export class LuModal {
	protected _factory = inject(LU_MODAL_REF_FACTORY);
	protected _config = inject(LU_MODAL_CONFIG);
	protected luDialogService = inject(LuDialogService);

	open<T extends ILuModalContent, D>(component: ComponentType<T>, data: D = undefined, config: Partial<LuModalConfig> = {}): ILuModalRef<D, LuModalContentResult<T>> {
		const extendedConfig = { ...this._config, ...config } as LuModalConfig;

		const mode = ({
			sidepanel: 'drawer',
			modal: 'modal',
		}[extendedConfig.mode] || 'modal') as LuDialogConfig<unknown>['mode'];

		const dialogRef = this.luDialogService.open({
			content: DialogContentAdapterComponent<D, T>,
			data: {
				component: component,
				data,
			},
			modal: !extendedConfig.noBackdrop,
			alert: extendedConfig.undismissable,
			mode: mode,
		});
		return new DialogRefAdapter<D, T>(dialogRef);
	}

	legacyOpen<T extends ILuModalContent, D>(component: ComponentType<T>, data: D = undefined, config: Partial<LuModalConfig> = {}): ILuModalRef<D, LuModalContentResult<T>> {
		const extendedConfig = { ...this._config, ...config } as LuModalConfig;
		const ref = this._factory.forge<T, LuModalConfig, D>(component, extendedConfig);
		ref.open(data);
		return ref;
	}
}
