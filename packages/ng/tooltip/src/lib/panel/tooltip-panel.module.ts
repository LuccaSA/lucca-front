import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LuTooltipPanelComponent } from './tooltip-panel.component';
import { LuSafeContentModule } from '@lucca-front/ng/safe-content';

@NgModule({
	imports: [CommonModule, LuSafeContentModule],
	declarations: [LuTooltipPanelComponent],
	exports: [LuTooltipPanelComponent],
})
export class LuTooltipPanelModule {}
