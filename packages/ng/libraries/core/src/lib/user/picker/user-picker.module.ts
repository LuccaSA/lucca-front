import { NgModule } from '@angular/core';
import { LuUserPickerComponent } from './user-picker.component';
import { CommonModule } from '@angular/common';
import { LuOptionModule } from '../../option/index';
import { LuUserDisplayModule } from '../display/index';

@NgModule({
	imports: [
		CommonModule,
		LuOptionModule,
		LuUserDisplayModule,
	],
	declarations: [
		LuUserPickerComponent,
	],
	exports: [
		LuUserPickerComponent,
	],
})
export class LuUserPickerModule {}
