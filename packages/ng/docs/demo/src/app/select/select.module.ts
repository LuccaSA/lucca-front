import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LuSelectModule, LuOptionModule, LuInputModule } from '@lucca-front/ng';
import { DemoSelectMultipleModule } from './multiple/select-multiple.module';

import { SharedModule } from '../shared';
import { DemoSelectFoundationsModule } from './foundations/select-foundations.module';
import { DemoOptionPickerModule } from './option-picker/option-picker.module';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		SharedModule,
		LuSelectModule,
		LuOptionModule,
		DemoSelectFoundationsModule,
		LuInputModule,
		DemoOptionPickerModule,
		DemoSelectMultipleModule,
	],
})
export class DemoSelectModule {}
