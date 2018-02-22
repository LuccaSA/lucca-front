import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LuEmptyModule } from '../../../../src/app/empty/empty.module';
import { LuTreeModule } from './../../../../src/app/tree-picker/';

import { SharedModule } from '../../shared';
import { DemoTreePickerComponent } from './demo-tree-picker.component';
import { LuPopoverModule } from '../../../../src/app/popover/popover.module';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		HttpClientModule,
		SharedModule,
		LuEmptyModule,
		LuTreeModule,
		LuPopoverModule,
	],
	declarations: [
		DemoTreePickerComponent,
	],
	exports: [
		DemoTreePickerComponent,
	]
})
export class DemoTreePickerStandAloneModule { }
