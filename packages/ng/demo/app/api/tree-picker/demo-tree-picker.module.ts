import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LuEmptyModule } from '../../../../src/app/empty/empty.module';
import { LuApiModule } from '../../../../src/app/api/api.module';

import { SharedModule } from '../../shared';
import { DemoTreePickerComponent } from './demo-tree-picker.component';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		HttpClientModule,
		SharedModule,
		LuEmptyModule,
		LuApiModule,
	],
	declarations: [
		DemoTreePickerComponent,
	],
	exports: [
		DemoTreePickerComponent,
	]
})
export class DemoTreePickerModule { }
