import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LuUserPicker } from './user-select-picker.component';
import { HttpClientModule } from '@angular/common/http';
import { LuSelectModule } from '../../../select';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		BrowserModule,
		HttpClientModule,
		LuSelectModule,
	],
	declarations: [
		LuUserPicker,
	],
	exports: [
		LuUserPicker,
	]
})
export class LuUserPickerModule { }

