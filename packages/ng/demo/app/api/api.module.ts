import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DemoApiComponent } from './api.component';
import { SharedModule } from '../shared/index';

// import { BasicComponent } from './basic/basic';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		SharedModule,
		// LuEmptyModule,
	],
	declarations: [
		DemoApiComponent,
		// BasicComponent,
	],
	exports: [
		// DemoNotEmptyComponent,
	]
})
export class DemoApiModule { }
