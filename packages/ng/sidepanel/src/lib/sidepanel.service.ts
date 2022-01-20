import { Injectable, Inject } from '@angular/core';
import { LuModal } from '@lucca-front/ng/modal';
import { ILuSidepanelConfig } from './sidepanel-config.model';
import { LU_SIDEPANEL_CONFIG, LU_SIDEPANEL_REF_FACTORY } from './sidepanel.token';
import { ILuPopupRefFactory } from '@lucca-front/ng/popup';

@Injectable()
export class LuSidepanel<C extends ILuSidepanelConfig = ILuSidepanelConfig> extends LuModal<C> {
	constructor(
		@Inject(LU_SIDEPANEL_REF_FACTORY) protected override _factory: ILuPopupRefFactory,
		@Inject(LU_SIDEPANEL_CONFIG) protected override _config: ILuSidepanelConfig,
	) {
		super(_factory, _config);
	}
}
