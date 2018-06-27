import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { OverlayModule } from '@angular/cdk/overlay';
import { LuSelectClearerModule } from './clearer/index';
import { LuSelectDirectiveModule } from './directive/index';
import { LuSelectOptionModule } from './option/index';
import { LuSelectPickerModule } from './picker/index';
import { LuSelectSearcherModule } from './searcher/index';
import { LuSelect } from './select.component';
import { LuPopoverModule } from '../popover/popover.module';
import { LU_SELECT_INTL_PROVIDER } from './utils/select.intl';

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
	providers: [LU_SELECT_INTL_PROVIDER],
})
export class LuSelectModule {}
