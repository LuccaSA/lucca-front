import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DemoNotEmptyComponent } from './not-empty.component';
import { LuNotEmptyModule } from '../../../src/app/not-empty';
import { SharedModule } from '../shared/index';

import { BasicComponent } from './basic/basic';
import { CustomFnComponent } from './custom-fn/custom-fn';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		SharedModule,
		LuNotEmptyModule,
	],
	declarations: [
		DemoNotEmptyComponent,
		BasicComponent,
		CustomFnComponent,
	],
	exports: [
		// DemoNotEmptyComponent,
	]
})
export class DemoNotEmptyModule { }
