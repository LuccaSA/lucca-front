import { NgModule } from '@angular/core';
import { LuApiFeederModule } from './feeder/index';
import { LuApiSelectInputModule } from './input/index';
import { LuApiPagerModule } from './pager/index';
import { LuApiSearcherModule } from './searcher/index';

@NgModule({
	imports: [LuApiFeederModule, LuApiSearcherModule, LuApiPagerModule, LuApiSelectInputModule],
	exports: [LuApiFeederModule, LuApiSearcherModule, LuApiPagerModule, LuApiSelectInputModule],
})
export class LuApiSelectModule {}
