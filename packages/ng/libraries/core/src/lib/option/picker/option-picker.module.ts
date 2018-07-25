import { NgModule } from '@angular/core';
import { LuOptionPickerComponent } from './option-picker.component';
import { CommonModule } from '@angular/common';
import { LuOptionItemModule } from '../item/index';

@NgModule({
	imports: [
		CommonModule,

		LuOptionItemModule,
	],
	declarations: [
		LuOptionPickerComponent,
	],
	exports: [
		LuOptionPickerComponent,
	],
})
export class LuOptionPickerModule {}
