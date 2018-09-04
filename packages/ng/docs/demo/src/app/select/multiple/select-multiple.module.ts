import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LuSelectModule, LuOptionModule, LuInputModule } from '@lucca-front/ng';
import { DemoSelectMultipleComponent } from './select-multiple.component';
import { BasicComponent } from './basic/basic';

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
		DemoSelectMultipleComponent,
		BasicComponent,
	],
	exports: [DemoSelectMultipleComponent],
})
export class DemoSelectMultipleModule {}
