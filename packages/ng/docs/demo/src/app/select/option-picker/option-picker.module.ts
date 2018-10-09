import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LuSelectModule, LuOptionModule, LuInputModule } from '@lucca-front/ng';
import { DemoOptionPickerComponent } from './option-picker.component';
import { BasicComponent } from './basic/basic';
import { OperatorComponent } from './operator/operator';
import { CustomComponent, ColorOption } from './custom/custom';

import { SharedModule } from '../../shared';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		SharedModule,
		LuSelectModule,
		LuOptionModule,

		LuInputModule,
	],
	declarations: [
		DemoOptionPickerComponent,
		BasicComponent,
		OperatorComponent,
		CustomComponent,
		ColorOption,
	],
	exports: [DemoOptionPickerComponent],
})
export class DemoOptionPickerModule {}
