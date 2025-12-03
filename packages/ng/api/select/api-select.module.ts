import { NgModule } from '@angular/core';
import { LuApiFeederComponent } from './feeder/index';
import { LuApiSelectInputComponent } from './input/index';
import { LuApiPagerComponent } from './pager/index';
import { LuApiPagedSearcherComponent, LuApiSearcherComponent } from './searcher/index';

/**
 * @deprecated use `LuApiFeederComponent, LuApiPagedSearcherComponent, LuApiSearcherComponent, LuApiPagerComponent, LuApiSelectInputComponent` instead
 */
@NgModule({
	imports: [LuApiFeederComponent, LuApiPagedSearcherComponent, LuApiSearcherComponent, LuApiPagerComponent, LuApiSelectInputComponent],
	exports: [LuApiFeederComponent, LuApiPagedSearcherComponent, LuApiSearcherComponent, LuApiPagerComponent, LuApiSelectInputComponent],
})
export class LuApiSelectModule {}
