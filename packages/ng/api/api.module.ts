import { NgModule } from '@angular/core';
import { LuApiSelectModule } from './select/index';

/**
 * @deprecated use `LuApiFeederComponent, LuApiPagedSearcherComponent, LuApiSearcherComponent, LuApiPagerComponent, LuApiSelectInputComponent` instead
 */
@NgModule({
	imports: [LuApiSelectModule],
	exports: [LuApiSelectModule],
})
export class LuApiModule {}
