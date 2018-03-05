import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LuOptionFeederDirective } from './select-option-feeder.directive';
import { AbstractSelectOptionFeederComponent } from './select-option-feeder.component';

@NgModule({
	imports: [
		CommonModule,
	],
	declarations: [
		LuOptionFeederDirective,
		AbstractSelectOptionFeederComponent,
	],
	exports: [
		LuOptionFeederDirective,
		AbstractSelectOptionFeederComponent,
	]
})
export class LuSelectOptionFeederModule { }

