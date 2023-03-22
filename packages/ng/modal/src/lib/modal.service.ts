import { inject, Injectable } from '@angular/core';
import { LuPopup } from '@lucca-front/ng/popup';
import { LuModalConfig } from './modal-config.model';
import { LU_MODAL_CONFIG, LU_MODAL_REF_FACTORY } from './modal.token';

@Injectable()
export class LuModal<C extends LuModalConfig = LuModalConfig> extends LuPopup<C> {
	protected override _factory = inject(LU_MODAL_REF_FACTORY);
	protected override _config = inject<C>(LU_MODAL_CONFIG);
}
