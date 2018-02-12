import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LuApiPickerModule } from './picker';
import { LuDepartmentPickerModule } from './department-picker';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		HttpClientModule,
		LuApiPickerModule,
	],
	declarations: [
	],
	exports: [
		LuApiPickerModule,
		LuDepartmentPickerModule,
	],
})
export class LuApiModule { }
