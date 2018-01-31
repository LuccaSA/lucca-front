import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LuEmptyModule } from '../../../src/app/empty/empty.module';
import { LuSelectModule } from '../../../src/app/select/select.module';
import { DemoSelectsComponent } from './selects.component';
import { DemoSimpleSelectComponent } from './simple-select/simple-select.component';
import { SharedModule } from '../shared';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		SharedModule,
		LuEmptyModule,
		LuSelectModule,
	],
	declarations: [
		DemoSelectsComponent,
		DemoSimpleSelectComponent,
	],
	exports: [
		DemoSelectsComponent,
	]
})
export class DemoSelectsModule { }
