import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { OverlayModule } from '@angular/cdk/overlay';
import { LuSelectModule } from '../../select';
import { LuUserSelect } from './user-select.component';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		BrowserModule,
		OverlayModule,
		LuSelectModule,
	],
	declarations: [
		LuUserSelect,
	],
	exports: [
		LuUserSelect,
	]
})
export class LuUserSelectModule { }

