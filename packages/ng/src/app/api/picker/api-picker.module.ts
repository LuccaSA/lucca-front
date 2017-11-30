import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LuApiPickerDirective } from './api-picker.directive';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		HttpClientModule
	],
	declarations: [
		LuApiPickerDirective,
	],
	exports: [
		LuApiPickerDirective,
	],
})
export class LuApiPickerModule { }
