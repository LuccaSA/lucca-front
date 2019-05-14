import { NgModule } from '@angular/core';
import { LuModal } from './modal.service';
import { LU_MODAL_CONFIG } from './modal.token';
import { luDefaultModalConfig } from './modal-config.default';
import { LuPopupModule } from '../popup/index';
import { LuModalPanelComponent } from './modal-panel.component';


@NgModule({
	imports: [
		LuPopupModule,
	],
	declarations: [LuModalPanelComponent],
	entryComponents: [LuModalPanelComponent],
	exports: [LuModalPanelComponent],
	providers: [
		LuModal,
		{ provide: LU_MODAL_CONFIG, useValue: luDefaultModalConfig },
	]
})
export class LuModalModule {}
