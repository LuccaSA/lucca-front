import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { LuApiSelectPicker } from './api-select-picker.component';
import { LuSelectOptionModule, LU_SELECT_SEARCH_INTL_PROVIDER } from '../../../select';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		BrowserModule,
		HttpClientModule,
		LuSelectOptionModule,
	],
	declarations: [
		LuApiSelectPicker,
	],
	exports: [
		LuApiSelectPicker,
	],
	providers: [LU_SELECT_SEARCH_INTL_PROVIDER]
})
export class LuApiSelectPickerModule { }

