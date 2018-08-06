import { NgModule } from '@angular/core';
import { LuApiSelectInputComponent } from './api-select-input.component';
import { CommonModule } from '@angular/common';
import { LuOptionOperatorModule, LuOptionItemModule, LuOptionPickerModule } from '../../../option/index';
import { LuSelectClearerModule } from '../../../select/index';
import { LuApiSearcherModule } from '../searcher/index';
import { LuInputDisplayerModule } from '../../../input/index';

@NgModule({
	imports: [
		CommonModule,
		LuOptionItemModule,
		LuOptionOperatorModule,
		LuApiSearcherModule,
		LuOptionPickerModule,
		LuSelectClearerModule,
		LuInputDisplayerModule,
	],
	declarations: [
		LuApiSelectInputComponent,
	],
	exports: [
		LuApiSelectInputComponent,
	],
})
export class LuApiSelectInputModule {}
