import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LuApiPickerDirective } from './api.directive';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		HttpClientModule
	],
	declarations: [
		LuApiPickerDirective,
	],
	exports: [
		LuApiPickerDirective,
	],
})
export class LuApiModule { }
