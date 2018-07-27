import { NgModule } from '@angular/core';
import { LuUserPickerComponent } from './user-picker.component';
import { CommonModule } from '@angular/common';

@NgModule({
	imports: [
		CommonModule,
	],
	declarations: [
		LuUserPickerComponent,
	],
	exports: [
		LuUserPickerComponent,
	],
})
export class LuUserPickerModule {}
