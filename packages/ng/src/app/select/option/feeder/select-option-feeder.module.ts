import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LuOptionFeederDirective } from './select-option-feeder.directive';

@NgModule({
	imports: [
		CommonModule,
	],
	declarations: [
		LuOptionFeederDirective,
	],
	exports: [
		LuOptionFeederDirective,
	]
})
export class LuSelectOptionFeederModule { }

