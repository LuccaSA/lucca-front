import { inject, Injectable } from '@angular/core';
import { LuModal } from '@lucca-front/ng/modal';
import { ILuSidepanelConfig } from './sidepanel-config.model';
import { LU_SIDEPANEL_CONFIG, LU_SIDEPANEL_REF_FACTORY } from './sidepanel.token';

@Injectable()
export class LuSidepanel<C extends ILuSidepanelConfig = ILuSidepanelConfig> extends LuModal<C> {
	protected override _factory = inject(LU_SIDEPANEL_REF_FACTORY);
	protected override _config = inject(LU_SIDEPANEL_CONFIG);
}
