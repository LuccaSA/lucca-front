import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DemoApiSelectComponent } from './api-select.component';
import { LuApiSelectModule, LuSelectModule, LuOptionModule, LuInputDisplayerModule, LuEmptyModule } from '@lucca-front/ng';

import { SharedModule } from '../../shared';
import { FeederComponent } from './feeder/feeder';
import { SearcherComponent } from './searcher/searcher';
import { PagerComponent } from './pager/pager';
import { BasicComponent } from './basic/basic';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		SharedModule,
		LuApiSelectModule,
		LuSelectModule,
		LuOptionModule,
		LuInputDisplayerModule,
		LuEmptyModule,
	],
	declarations: [
		DemoApiSelectComponent,
		FeederComponent,
		SearcherComponent,
		PagerComponent,
		BasicComponent,
	],
	exports: [
		DemoApiSelectComponent,
	],
})
export class DemoApiSelectModule {}
