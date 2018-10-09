import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LuTooltipModule } from '@lucca-front/ng';
import { DemoTooltipComponent } from './tooltip.component';
import { DemoTooltipBasicComponent } from './basic/basic';
import { SharedModule } from '../shared';

@NgModule({
	imports: [CommonModule, LuTooltipModule, SharedModule],
	declarations: [
		DemoTooltipComponent,
		DemoTooltipBasicComponent,
	],
	exports: [
		DemoTooltipComponent,
		DemoTooltipBasicComponent,
	],
})
export class DemoTooltipModule { }
