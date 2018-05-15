import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LuEmptyModule, LuSelectModule } from '@core';
import { DemoSelectComponent } from './select.component';
import { DemoSimpleSelectComponent } from './simple-select/simple-select.component';

import { DemoClearerSelectModule } from './clearer/clearer.module';
import { DemoFeederSelectModule } from './feeder/feeder.module';
import { DemoModSelectModule } from './mod-select/mod-select.module';
import { DemoSearcherSelectModule } from './searcher/searcher.module';
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
