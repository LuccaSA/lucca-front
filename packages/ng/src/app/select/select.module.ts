import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverlayModule } from '@angular/cdk/overlay';
import { LuSelectPopover } from './select.popover.component';
import { LuSelectOption } from './select.option.component';
import { LuSelectDirective } from './select.directive';
import { LuSelect } from './select.component';
import { LuEmptyModule } from '../empty/empty.module';

@NgModule({
	imports: [
		CommonModule,
		OverlayModule,
		LuEmptyModule,
	],
	declarations: [
		LuSelectPopover,
		LuSelectOption,
		LuSelectDirective,
		LuSelect,
	],
	exports: [
		LuSelectPopover,
		LuSelectOption,
		LuSelectDirective,
		LuSelect,
	]
})
export class LuSelectModule { }

