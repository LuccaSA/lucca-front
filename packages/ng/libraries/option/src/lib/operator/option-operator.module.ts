import { NgModule } from '@angular/core';
import { LuOptionPagerModule } from './pager/index';
import { LuOptionFeederModule } from './feeder/index';
import { LuOptionSearcherModule } from './searcher/index';
import { LuForOptionsModule } from './for-options/index';

@NgModule({
	imports: [
		LuOptionPagerModule,
		LuOptionFeederModule,
		LuOptionSearcherModule,
		LuForOptionsModule,
	],
	exports: [
		LuOptionPagerModule,
		LuOptionFeederModule,
		LuOptionSearcherModule,
		LuForOptionsModule,
	],
})
export class LuOptionOperatorModule {}
