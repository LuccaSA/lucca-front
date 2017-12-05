import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LuApiPickerModule } from './picker';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		HttpClientModule,
		LuApiPickerModule
	],
	declarations: [
	],
	exports: [
		LuApiPickerModule,
	],
})
export class LuApiModule { }
