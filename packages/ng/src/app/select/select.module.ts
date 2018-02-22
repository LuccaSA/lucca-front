import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverlayModule } from '@angular/cdk/overlay';
import { LuSelectPickerModule } from './picker';
import { LuSelectOptionModule } from './option';
import { LuSelectClearerModule } from './clearer';
import { LuSelectDirective } from './directive';
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
	],
	declarations: [
		LuSelectDirective,
		LuSelect,
	],
	exports: [
		LuSelectPickerModule,
		LuSelectOptionModule,
		LuSelectClearerModule,
		LuSelectDirective,
		LuSelect,
	]
})
export class LuSelectModule { }

