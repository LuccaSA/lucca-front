import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LuEmptyModule, LuSelectModule } from '@lucca-front/ng';
import { DemoApiSelectModule } from './api-select/api-select.module';
import { SharedModule } from '../shared';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		SharedModule,
		LuEmptyModule,
		LuSelectModule,
		DemoApiSelectModule,
	],
	declarations: [],
	exports: [],
})
export class DemoApiModule {}
