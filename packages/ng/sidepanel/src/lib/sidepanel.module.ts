import { A11yModule } from '@angular/cdk/a11y';
import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LuTooltipModule } from '@lucca-front/ng/tooltip';
import { LuSidepanelPanelComponent, LuSidepanelPanelComponentDefaultCD } from './sidepanel-panel.component';
import { LuSidepanelRefFactory } from './sidepanel-ref.factory';
import { LuSidepanel } from './sidepanel.service';
import { LU_SIDEPANEL_REF_FACTORY } from './sidepanel.token';

/**
 * @deprecated Use LuModal with `modal.open(component, data, { mode: 'sidepanel' })` instead.
 */
@NgModule({
	imports: [OverlayModule, CommonModule, A11yModule, LuTooltipModule],
	declarations: [LuSidepanelPanelComponent, LuSidepanelPanelComponentDefaultCD],
	exports: [LuSidepanelPanelComponent, LuSidepanelPanelComponentDefaultCD],
	providers: [LuSidepanel, { provide: LU_SIDEPANEL_REF_FACTORY, useClass: LuSidepanelRefFactory }],
})
export class LuSidepanelModule {}
