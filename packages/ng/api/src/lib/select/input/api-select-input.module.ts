import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LuInputClearerModule, LuInputDisplayerModule } from '@lucca-front/ng/input';
import { LuForOptionsModule, LuOptionPickerModule } from '@lucca-front/ng/option';
import { LuApiSearcherModule } from '../searcher/index';
import { LuApiSelectInputComponent } from './api-select-input.component';

@NgModule({
	imports: [
		CommonModule,
		LuOptionPickerModule,
		LuForOptionsModule,
		LuApiSearcherModule,
		LuInputClearerModule,
		LuInputDisplayerModule,
	],
	declarations: [
		LuApiSelectInputComponent,
	],
	exports: [
		LuApiSelectInputComponent,
	],
})
export class LuApiSelectInputModule { }
