import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotEmptyDirective } from './not-empty.directive';

@NgModule({
	imports: [
		CommonModule
	],
	declarations: [NotEmptyDirective],
	exports: [NotEmptyDirective]
})
export class LuNotEmptyModule { }
