import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { OverlayModule } from '@angular/cdk/overlay';
import { LuSelectClearerModule } from './clearer';
import { LuSelectDirectiveModule } from './directive';
import { LuSelectOptionModule } from './option';
import { LuSelectPickerModule } from './picker';
import { LuSelectSearcherModule } from './searcher';
import { LuSelect } from './select.component';
import { LuPopoverModule } from '../popover/popover.module';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		BrowserModule,
		OverlayModule,
		LuPopoverModule,

		LuSelectClearerModule,
		LuSelectDirectiveModule,
		LuSelectOptionModule,
		LuSelectPickerModule,
		LuSelectSearcherModule,
	],
	declarations: [
		LuSelect,
	],
	exports: [
		LuSelectClearerModule,
		LuSelectDirectiveModule,
		LuSelectOptionModule,
		LuSelectPickerModule,
		LuSelectSearcherModule,
		LuSelect,
	],
})
export class LuSelectModule {}
