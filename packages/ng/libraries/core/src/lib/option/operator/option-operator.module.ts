import { NgModule } from '@angular/core';
import { LuOptionPagerModule } from './pager/index';
import { LuOptionFeederModule } from './feeder/index';
import { LuOptionSearcherModule } from './searcher/index';
import { LuOptionsModule } from './options/index';

@NgModule({
	imports: [
		LuOptionPagerModule,
		LuOptionFeederModule,
		LuOptionSearcherModule,
		LuOptionsModule,
	],
	exports: [
		LuOptionPagerModule,
		LuOptionFeederModule,
		LuOptionSearcherModule,
		LuOptionsModule,
	],
})
export class LuOptionOperatorModule {}
