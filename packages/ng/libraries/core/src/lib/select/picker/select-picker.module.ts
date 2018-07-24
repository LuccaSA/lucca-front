import { NgModule } from '@angular/core';
import { LuSelectPickerComponent } from './select-picker.component';
import { CommonModule } from '@angular/common';

@NgModule({
	imports: [
		CommonModule,
	],
	declarations: [
		LuSelectPickerComponent,
	],
	exports: [
		LuSelectPickerComponent,
	],
})
export class LuSelectPickerModule {}
