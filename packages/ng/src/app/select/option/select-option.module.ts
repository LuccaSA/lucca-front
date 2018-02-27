import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LuSelectOption } from './select-option.component';
import { LuOptionFeederDirective } from './select-option-feeder.directive';
import { AbstractSelectOptionFeederComponent } from './select-option-feeder.component';

@NgModule({
	imports: [
		CommonModule,
	],
	declarations: [
		LuSelectOption,
		LuOptionFeederDirective,
		AbstractSelectOptionFeederComponent,
	],
	exports: [
		LuSelectOption,
		LuOptionFeederDirective,
		AbstractSelectOptionFeederComponent,
	]
})
export class LuSelectOptionModule { }

