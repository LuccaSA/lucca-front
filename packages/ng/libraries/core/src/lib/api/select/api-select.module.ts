import { NgModule } from '@angular/core';
import { LuApiFeederModule } from './feeder/index';
import { LuApiSearcherModule } from './searcher/index';
import { LuApiPagerModule } from './pager/index';

@NgModule({
	imports: [
		LuApiFeederModule,
		LuApiSearcherModule,
		LuApiPagerModule,
	],
	exports: [
		LuApiFeederModule,
		LuApiSearcherModule,
		LuApiPagerModule,
	],
})
export class LuApiSelectModule {}
