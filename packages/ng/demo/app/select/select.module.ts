import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LuEmptyModule } from '../../../src/app/empty/empty.module';
import { LuSelectModule } from '../../../src/app/select/select.module';
import { DemoSelectComponent } from './select.component';
import { DemoSimpleSelectComponent } from './simple-select/simple-select.component';

import { DemoClearerSelectModule } from './clearer-select/clearer-select.module';
import { DemoFeederSelectModule } from './feeder-select/feeder-select.module';
import { DemoModSelectModule } from './mod-select/mod-select.module';
import { DemoSearcherSelectModule } from './searcher-select/searcher-select.module';
import { SharedModule } from '../shared';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		SharedModule,
		LuEmptyModule,
		LuSelectModule,
		DemoClearerSelectModule,
		DemoModSelectModule,
		DemoFeederSelectModule,
		DemoSearcherSelectModule,
	],
	declarations: [DemoSelectComponent, DemoSimpleSelectComponent],
	exports: [DemoSelectComponent],
	providers: [],
})
export class DemoSelectModule {}
