import { NgModule } from '@angular/core';
import { LuTreeOptionPickerComponent } from './tree-option-picker.component';
import { CommonModule } from '@angular/common';
import { OverlayModule } from '@angular/cdk/overlay';
import { LuScrollModule } from '../../../scroll/index';
import { A11yModule } from '@angular/cdk/a11y';

@NgModule({
	imports: [
		CommonModule,
		OverlayModule,
		LuScrollModule,
		A11yModule,
	],
	declarations: [
		LuTreeOptionPickerComponent,
	],
	exports: [
		LuTreeOptionPickerComponent,
	],
})
export class LuTreeOptionPickerModule {}
