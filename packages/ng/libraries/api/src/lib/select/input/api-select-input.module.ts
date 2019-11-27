import { NgModule } from '@angular/core';
import { LuApiSelectInputComponent } from './api-select-input.component';
import { CommonModule } from '@angular/common';
import { LuOptionOperatorModule, LuOptionItemModule, LuOptionPickerModule } from '@lucca-front/ng/option';
import { LuApiSearcherModule } from '../searcher/index';
import { LuInputDisplayerModule, LuInputClearerModule } from '@lucca-front/ng/input';

@NgModule({
	imports: [
		CommonModule,
		LuOptionItemModule,
		LuOptionOperatorModule,
		LuApiSearcherModule,
		LuOptionPickerModule,
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
export class LuApiSelectInputModule {}
