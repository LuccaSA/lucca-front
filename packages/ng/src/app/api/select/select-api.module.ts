import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { OverlayModule } from '@angular/cdk/overlay';
import { HttpClientModule } from '@angular/common/http';
import { LuSelectModule } from '../../select';
import { LuSelectApiPickerModule } from './picker';
import { LuSelectApi } from './select-api.component';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		BrowserModule,
		OverlayModule,
		HttpClientModule,
		LuSelectApiPickerModule,
		LuSelectModule,
	],
	declarations: [
		LuSelectApi,
	],
	exports: [
		LuSelectApi,
		LuSelectApiPickerModule,
	]
})
export class LuSelectApiModule { }

