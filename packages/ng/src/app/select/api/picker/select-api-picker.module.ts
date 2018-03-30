import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { LuSelectApiPicker } from './select-api-picker.component';
import { LuSelectOptionModule } from '../../option';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		BrowserModule,
		HttpClientModule,
		LuSelectOptionModule,
	],
	declarations: [
		LuSelectApiPicker,
	],
	exports: [
		LuSelectApiPicker,
	]
})
export class LuSelectApiPickerModule { }

