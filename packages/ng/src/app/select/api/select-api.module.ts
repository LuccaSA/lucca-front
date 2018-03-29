import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { OverlayModule } from '@angular/cdk/overlay';
import { HttpClientModule } from '@angular/common/http';
import { LuSelectDirectiveModule } from '../directive';
import { LuSelectPickerModule } from '../picker';
import { LuApiPickerModule } from './picker';
import { LuSelectApi } from './select-api.component';
import { LuApiFeederModule } from './feeder';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		BrowserModule,
		OverlayModule,
		HttpClientModule,
		LuApiPickerModule,
		LuSelectDirectiveModule,
		LuSelectPickerModule,
		LuApiFeederModule,
	],
	declarations: [
		LuSelectApi,
	],
	exports: [
		LuSelectApi,
		LuApiPickerModule,
		LuApiFeederModule,
	]
})
export class LuSelectApiModule { }

