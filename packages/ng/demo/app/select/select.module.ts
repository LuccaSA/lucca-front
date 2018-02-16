import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LuEmptyModule } from '../../../src/app/empty/empty.module';
import { LuSelectModule } from '../../../src/app/select/select.module';
import { DemoSelectComponent } from './select.component';
import { DemoSimpleSelectComponent } from './simple-select/simple-select.component';
import { DemoClearerSelectComponent } from './clearer-select/clearer-select.component';
import { DemoSearcherSelectComponent } from './searcher-select/searcher-select.component';
import { DemoModSelectComponent } from './mod-select/mod-select.component';
import { DemoSelectFeeder } from './feeder-select/feeder-select.component';
import { FakeSelectFeeder } from './feeder-select/fake-select-feeder.component';
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
		DemoSelectComponent,
		DemoSimpleSelectComponent,
		DemoClearerSelectComponent,
		DemoSearcherSelectComponent,
		DemoModSelectComponent,
		DemoSelectFeeder,
		FakeSelectFeeder,
	],
	exports: [
		DemoSelectComponent,
	]
})
export class DemoSelectModule { }
