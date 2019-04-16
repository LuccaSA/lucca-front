import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverlayModule } from '@angular/cdk/overlay';
import { LuPopoverPanelComponent } from './popover-panel.component';

@NgModule({
	imports: [
		CommonModule,
		OverlayModule,
	],
	declarations: [
		LuPopoverPanelComponent,
	],
	exports: [
		LuPopoverPanelComponent,
	],
})
export class LuOverlayPopoverPanelModule {}
