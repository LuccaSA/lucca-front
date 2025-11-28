import { NgModule } from '@angular/core';
import { LuApiPagedSearcherComponent, LuApiSearcherComponent } from './api-searcher.component';

/**
 * @deprecated use `LuApiPagedSearcherComponent, LuApiSearcherComponent` instead
 */
@NgModule({
	imports: [LuApiPagedSearcherComponent, LuApiSearcherComponent],
	exports: [LuApiPagedSearcherComponent, LuApiSearcherComponent],
})
export class LuApiSearcherModule {}
