import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LuSelectOption } from './select-option.component';
import { LuSelectOptionFeederModule } from './feeder/select-option-feeder.module';

@NgModule({
	imports: [
		CommonModule,
		LuSelectOptionFeederModule,
	],
	declarations: [
		LuSelectOption,
	],
	exports: [
		LuSelectOption,
		LuSelectOptionFeederModule,
	]
})
export class LuSelectOptionModule { }

