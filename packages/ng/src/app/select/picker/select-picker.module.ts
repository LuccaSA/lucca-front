import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LuSelectPicker } from './select-picker.component';

@NgModule({
	imports: [
		CommonModule,
	],
	declarations: [
		LuSelectPicker,
	],
	exports: [
		LuSelectPicker,
	]
})
export class LuSelectPickerModule { }

