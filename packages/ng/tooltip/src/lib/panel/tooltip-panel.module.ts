import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LuTooltipPanelComponent } from './tooltip-panel.component';

@NgModule({
	imports: [CommonModule],
	declarations: [LuTooltipPanelComponent],
	exports: [LuTooltipPanelComponent],
	entryComponents: [LuTooltipPanelComponent],
})
export class LuTooltipPanelModule {}
