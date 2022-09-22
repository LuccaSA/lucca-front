import { NgModule } from '@angular/core';
import { LuApiFeederComponent } from './feeder/index';
import { LuApiSelectInputComponent } from './input/index';
import { LuApiPagerComponent, LuApiPagerModule } from './pager/index';
import { LuApiPagedSearcherComponent, LuApiSearcherComponent, LuApiSearcherModule } from './searcher/index';

@NgModule({
	imports: [LuApiFeederComponent, LuApiPagedSearcherComponent, LuApiSearcherComponent, LuApiPagerComponent, LuApiSelectInputComponent],
	exports: [LuApiFeederComponent, LuApiSearcherModule, LuApiPagerModule, LuApiSelectInputComponent],
})
export class LuApiSelectModule {}
