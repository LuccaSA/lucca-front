import { NgModule } from '@angular/core';
import { LuApiFeederModule } from './feeder/index';
import { LuApiSearcherModule } from './searcher/index';
import { LuApiPagerModule } from './pager/index';
import { LuApiSelectInputModule } from './input/index';

@NgModule({
	imports: [
		LuApiFeederModule,
		LuApiSearcherModule,
		LuApiPagerModule,
		LuApiSelectInputModule,
	],
	exports: [
		LuApiFeederModule,
		LuApiSearcherModule,
		LuApiPagerModule,
		LuApiSelectInputModule,
	],
})
export class LuApiSelectModule {}
