import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DemoApiSelectComponent } from './api-select.component';
import { LuApiModule, LuSelectModule, LuOptionModule } from '@lucca-front/ng';

import { SharedModule } from '../../shared';
import { FeederComponent } from './feeder/feeder';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		SharedModule,
		LuApiModule,
		LuSelectModule,
		LuOptionModule,
	],
	declarations: [DemoApiSelectComponent, FeederComponent],
	exports: [DemoApiSelectComponent, FeederComponent],
})
export class DemoApiSelectModule {}
