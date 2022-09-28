import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LuSelectPanelModule } from '../panel/panel.module';
import { LuSimpleSelectInputComponent } from './select-input.component';

@NgModule({
	imports: [CommonModule, LuSelectPanelModule, OverlayModule],
	declarations: [LuSimpleSelectInputComponent],
	exports: [LuSimpleSelectInputComponent],
})
export class LuSelectInputSimpleModule {}
