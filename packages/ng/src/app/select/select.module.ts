import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverlayModule } from '@angular/cdk/overlay';
import { LuSelectPicker } from './picker';
import { LuSelectOption } from './option';
import { LuSelectClearerComponent } from './clearer';
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
	],
	declarations: [
		LuSelectPicker,
		LuSelectOption,
		LuSelectDirective,
		LuSelectClearerComponent,
		LuSelect,
	],
	exports: [
		LuSelectPicker,
		LuSelectOption,
		LuSelectDirective,
		LuSelectClearerComponent,
		LuSelect,
	]
})
export class LuSelectModule { }

