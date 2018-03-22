import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { OverlayModule } from '@angular/cdk/overlay';
import { LuSelectPickerModule } from './picker';
import { LuSelectOptionModule } from './option';
import { LuSelectApiModule } from './api';
import { LuSelectClearerModule } from './clearer';
import { LuSelectSearcherModule } from './searcher';
import { LuSelectDirectiveModule } from './directive';
import { LuSelect } from './select.component';
import { LuEmptyModule } from '../empty/empty.module';
import { LuPopoverModule } from '../popover/popover.module';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		BrowserModule,
		OverlayModule,
		LuPopoverModule,
		LuEmptyModule,
		LuSelectPickerModule,
		LuSelectOptionModule,
		LuSelectApiModule,
		LuSelectClearerModule,
		LuSelectDirectiveModule,
		LuSelectSearcherModule,
	],
	declarations: [
		LuSelect,
	],
	exports: [
		LuSelectPickerModule,
		LuSelectOptionModule,
		LuSelectApiModule,
		LuSelectClearerModule,
		LuSelectDirectiveModule,
		LuSelectSearcherModule,
		LuSelect,
	]
})
export class LuSelectModule { }

