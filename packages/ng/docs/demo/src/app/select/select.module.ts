import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LuSelectModule, LuOptionModule, LuInputModule } from '@lucca-front/ng';
// import { DemoSelectComponent } from './select.component';
// import { BasicSelectComponent } from './basic/basic';
// import { MultipleSelectComponent } from './multiple/multiple';

import { SharedModule } from '../shared';
import { DemoSelectFoundationsModule } from './foundations/select-foundations.module';

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
	],
	// declarations: [DemoSelectComponent, BasicSelectComponent, MultipleSelectComponent],
	// exports: [DemoSelectComponent],
})
export class DemoSelectModule {}
