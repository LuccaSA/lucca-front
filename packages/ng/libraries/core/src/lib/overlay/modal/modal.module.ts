import { NgModule } from '@angular/core';
import { LuModal } from './modal.service';
import { LU_MODAL_CONFIG } from './modal.token';
import { luDefaultModalConfig } from './modal-config.default';
import { LuModalPanelComponent } from './modal-panel.component';
import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';


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
		{ provide: LU_MODAL_CONFIG, useValue: luDefaultModalConfig },
	]
})
export class LuModalModule {}
