import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DemoApiSelectComponent } from './api-select.component';
import { LuApiSelectModule, LuSelectModule, LuOptionModule } from '@lucca-front/ng';

import { SharedModule } from '../../shared';
import { FeederComponent } from './feeder/feeder';
import { SearcherComponent } from './searcher/searcher';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		SharedModule,
		LuApiSelectModule,
		LuSelectModule,
		LuOptionModule,
	],
	declarations: [
		DemoApiSelectComponent,
		FeederComponent,
		SearcherComponent,
	],
	exports: [
		DemoApiSelectComponent,
		FeederComponent,
		SearcherComponent,
	],
})
export class DemoApiSelectModule {}
