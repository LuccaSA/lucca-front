import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverlayModule } from '@angular/cdk/overlay';
import { LuPopoverPanelComponent } from './popover-panel.component';
import { A11yModule } from '@angular/cdk/a11y';

@NgModule({
	imports: [CommonModule, OverlayModule, A11yModule],
	declarations: [LuPopoverPanelComponent],
	exports: [LuPopoverPanelComponent],
})
export class LuPopoverPanelModule {}
