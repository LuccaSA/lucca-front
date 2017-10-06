import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { LuEmptyDirective } from './empty.directive';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
	],
	declarations: [LuEmptyDirective],
	exports: [LuEmptyDirective]
})
export class LuEmptyModule { }
