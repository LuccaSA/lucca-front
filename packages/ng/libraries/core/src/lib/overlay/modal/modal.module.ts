import { NgModule } from '@angular/core';
import { LuModal } from './modal.service';
import { LU_MODAL_CONFIG } from './modal.token';
import { luDefaultModalConfig } from './modal-config.default';
import { LuModalPanelComponent } from './modal-panel.component';
import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { LU_POPUP_REF_FACTORY, LU_POPUP_CONFIG } from '../popup';
import { LuModalRefFactory } from './modal-ref.factory';


@NgModule({
	imports: [
		OverlayModule,
		PortalModule,
	],
	declarations: [LuModalPanelComponent],
	entryComponents: [LuModalPanelComponent],
	exports: [LuModalPanelComponent],
	providers: [
		LuModal,
		{ provide: LU_POPUP_CONFIG, useValue: luDefaultModalConfig },
		{ provide: LU_MODAL_CONFIG, useValue: luDefaultModalConfig },
		{ provide: LU_POPUP_REF_FACTORY, useClass: LuModalRefFactory },
	]
})
export class LuModalModule {}
