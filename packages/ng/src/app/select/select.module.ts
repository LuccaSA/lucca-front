import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverlayModule } from '@angular/cdk/overlay';
import { LuSelectPickerModule } from './picker';
import { LuSelectOptionModule } from './option';
import { LuSelectClearerModule } from './clearer';
import { LuSelectDirectiveModule } from './directive';
import { LuSelect } from './select.component';
import { LuEmptyModule } from '../empty/empty.module';
import { LuPopoverModule } from '../popover/popover.module';

@NgModule({
	imports: [
		CommonModule,
		OverlayModule,
		LuPopoverModule,
		LuEmptyModule,
		LuSelectPickerModule,
		LuSelectOptionModule,
		LuSelectClearerModule,
		LuSelectDirectiveModule,
	],
	declarations: [
		LuSelect,
	],
	exports: [
		LuSelectPickerModule,
		LuSelectOptionModule,
		LuSelectClearerModule,
		LuSelectDirectiveModule,
		LuSelect,
	]
})
export class LuSelectModule { }

