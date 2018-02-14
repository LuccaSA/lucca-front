import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { OverlayModule } from '@angular/cdk/overlay';
import { LuSelectPickerModule } from './picker';
import { LuSelectOptionModule } from './option';
import { LuSelectClearerModule } from './clearer';
import { LuSelectSearcherComponent} from './searcher';
import { LuSelectDirectiveModule } from './directive';
import { LuSelect } from './select.component';
import { LuEmptyModule } from '../empty/empty.module';
import { LuPopoverModule } from '../popover/popover.module';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		OverlayModule,
		LuPopoverModule,
		LuEmptyModule,
		LuSelectPickerModule,
		LuSelectOptionModule,
		LuSelectClearerModule,
		LuSelectDirectiveModule,
	],
	declarations: [
		LuSelectSearcherComponent,
		LuSelect,
	],
	exports: [
		LuSelectPickerModule,
		LuSelectOptionModule,
		LuSelectClearerModule,
		LuSelectDirectiveModule,
		LuSelectSearcherComponent,
		LuSelect,
	]
})
export class LuSelectModule { }

