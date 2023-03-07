import { A11yModule } from '@angular/cdk/a11y';
import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LuTooltipModule } from '@lucca-front/ng/tooltip';
import { LuModalPanelComponent, LuModalPanelComponentDefaultCD } from './modal-panel.component';
import { LuModalRefFactory } from './modal-ref.factory';
import { LuModal } from './modal.service';
import { LU_MODAL_REF_FACTORY } from './modal.token';

@NgModule({
	imports: [OverlayModule, CommonModule, A11yModule, LuTooltipModule],
	declarations: [LuModalPanelComponent, LuModalPanelComponentDefaultCD],
	exports: [LuModalPanelComponent, LuModalPanelComponentDefaultCD],
	providers: [LuModal, { provide: LU_MODAL_REF_FACTORY, useClass: LuModalRefFactory }],
})
export class LuModalModule {}
