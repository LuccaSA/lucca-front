import { Injectable, Inject } from '@angular/core';
import { LuModal } from '../modal/index';
import { ILuSidepanelConfig } from './sidepanel-config.model';
import { LU_SIDEPANEL_CONFIG, LU_SIDEPANEL_REF_FACTORY } from './sidepanel.token';
import { ILuPopupRefFactory } from '../popup/index';

@Injectable()
export class LuSidepanel extends LuModal {
	constructor(
		@Inject(LU_SIDEPANEL_REF_FACTORY) protected _factory: ILuPopupRefFactory,
		@Inject(LU_SIDEPANEL_CONFIG) protected _config: ILuSidepanelConfig,
	) {
		super(_factory, _config);
	}
}
