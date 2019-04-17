import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LuTooltipPanelComponent } from './tooltip-panel.component';
import { LuSafeContentModule } from '../../../safe-content/index';

@NgModule({
	imports: [
		CommonModule,
		LuSafeContentModule,
	],
	declarations: [
		LuTooltipPanelComponent,
	],
	exports: [
		LuTooltipPanelComponent,
	],
	entryComponents: [
		LuTooltipPanelComponent,
	]
})
export class LuTooltipPanelModule { }
