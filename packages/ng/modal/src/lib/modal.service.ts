import { Injectable, Inject } from '@angular/core';
import { LuPopup, ILuPopupRefFactory } from '@lucca-front/ng/popup';
import { ILuModalConfig } from './modal-config.model';
import { LU_MODAL_CONFIG, LU_MODAL_REF_FACTORY } from './modal.token';

@Injectable()
export class LuModal<C extends ILuModalConfig = ILuModalConfig> extends LuPopup<C> {
	constructor(
		@Inject(LU_MODAL_REF_FACTORY) protected override _factory: ILuPopupRefFactory,
		@Inject(LU_MODAL_CONFIG) protected override _config: ILuModalConfig,
	) {
		super(_factory, _config);
	}
}
