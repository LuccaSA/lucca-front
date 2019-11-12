import { Injectable, Inject } from '@angular/core';
import { LuPopup, ILuPopupRefFactory } from '../popup/index';
import { ILuModalConfig } from './modal-config.model';
import { LU_MODAL_CONFIG, LU_MODAL_REF_FACTORY } from './modal.token';

@Injectable()
export class LuModal extends LuPopup {
	constructor(
		@Inject(LU_MODAL_REF_FACTORY) protected _factory: ILuPopupRefFactory,
		@Inject(LU_MODAL_CONFIG) protected _config: ILuModalConfig,
	) {
		super(_factory, _config);
	}
}
