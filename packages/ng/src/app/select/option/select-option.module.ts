import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LuSelectOption } from './select-option.component';

@NgModule({
	imports: [
		CommonModule,
	],
	declarations: [
		LuSelectOption,
	],
	exports: [
		LuSelectOption,
	]
})
export class LuSelectOptionModule { }

