import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DemoEmptyComponent } from './empty.component';
import { LuEmptyModule } from '@core';
import { SharedModule } from '../shared/index';

import { BasicComponent } from './basic/basic';
import { CustomFnComponent } from './custom-fn/custom-fn';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		SharedModule,
		LuEmptyModule,
	],
	declarations: [DemoEmptyComponent, BasicComponent, CustomFnComponent],
	exports: [
		// DemoNotEmptyComponent,
	],
})
export class DemoEmptyModule {}
