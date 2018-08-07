import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LuSelectModule, LuOptionModule, LuInputModule } from '@lucca-front/ng';
import { DemoSelectComponent } from './select.component';
import { BasicSelectComponent } from './basic/basic';

import { SharedModule } from '../shared';

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
	declarations: [DemoSelectComponent, BasicSelectComponent],
	exports: [DemoSelectComponent],
})
export class DemoSelectModule {}
