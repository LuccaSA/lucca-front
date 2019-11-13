import { NgModule } from '@angular/core';
import { LuApiSelectInputComponent } from './api-select-input.component';
import { CommonModule } from '@angular/common';
import { LuOptionOperatorModule, LuOptionItemModule, LuOptionPickerModule } from '@lucca-front/ng/option';
import { LuSelectClearerModule } from '@lucca-front/ng/select';
import { LuApiSearcherModule } from '../searcher/index';
import { LuInputDisplayerModule } from '@lucca-front/ng/input';

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
