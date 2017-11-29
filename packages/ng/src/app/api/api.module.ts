import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LuApiDirective } from './api.directive';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		HttpClientModule
	],
	declarations: [
		LuApiDirective,
	],
	exports: [
		LuApiDirective,
	],
})
export class LuApiModule { }
