import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LuSelectOption } from './select-option.component';
import { LuOptionFeederDirective } from './select-option-feeder.directive';

@NgModule({
	imports: [
		CommonModule,
	],
	declarations: [
		LuSelectOption,
		LuOptionFeederDirective,
	],
	exports: [
		LuSelectOption,
		LuOptionFeederDirective,
	]
})
export class LuSelectOptionModule { }

