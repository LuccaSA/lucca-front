import { NgModule } from '@angular/core';
import { LuSelectPickerComponent } from './select-picker.component';
import { CommonModule } from '@angular/common';
import { LuOptionModule } from '../../option/index';

@NgModule({
	imports: [
		CommonModule,

		LuOptionModule,
	],
	declarations: [
		LuSelectPickerComponent,
	],
	exports: [
		LuSelectPickerComponent,
	],
})
export class LuSelectPickerModule {}
