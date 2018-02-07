import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LuSelectDirective } from './select.directive';

@NgModule({
	imports: [
		CommonModule,
	],
	declarations: [
		LuSelectDirective,
	],
	exports: [
		LuSelectDirective,
	]
})
export class LuSelectDirectiveModule { }

