import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LuEmptyDirective } from './empty.directive';

@NgModule({
	imports: [
		CommonModule
	],
	declarations: [LuEmptyDirective],
	exports: [LuEmptyDirective]
})
export class LuEmptyModule { }
