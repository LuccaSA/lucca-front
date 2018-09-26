import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LuTooltipDirective } from './tooltip.directive';
import { LuTooltipPanelComponent } from './panel/tooltip-panel.component';
import { LuSafeContentModule } from '../safe-content';

@NgModule({
	imports: [
		CommonModule,
		LuSafeContentModule,
	],
	declarations: [
		LuTooltipDirective,
		LuTooltipPanelComponent,
	],
	exports: [
		LuTooltipDirective,
	],
	entryComponents: [
		LuTooltipPanelComponent,
	]
})
export class LuTooltipModule {}
