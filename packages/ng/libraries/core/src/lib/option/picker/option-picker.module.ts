import { NgModule } from '@angular/core';
import { LuOptionPickerComponent } from './option-picker.component';
import { CommonModule } from '@angular/common';
import { LuOptionItemModule } from '../item/index';
import { LuScrollModule } from '../../scroll/index';

@NgModule({
	imports: [
		CommonModule,

		LuOptionItemModule,
		LuScrollModule,
	],
	declarations: [
		LuOptionPickerComponent,
	],
	exports: [
		LuOptionPickerComponent,
	],
})
export class LuOptionPickerModule {}
