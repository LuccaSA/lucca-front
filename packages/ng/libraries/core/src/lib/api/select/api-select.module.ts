import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { OverlayModule } from '@angular/cdk/overlay';
import { HttpClientModule } from '@angular/common/http';
import { LuSelectModule } from '../../select';
import { LuApiSelectPickerModule } from './picker';
import { LuApiSelect } from './api-select.component';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		BrowserModule,
		OverlayModule,
		HttpClientModule,
		LuApiSelectPickerModule,
		LuSelectModule,
	],
	declarations: [LuApiSelect],
	exports: [LuApiSelect, LuApiSelectPickerModule],
})
export class LuApiSelectModule {}
