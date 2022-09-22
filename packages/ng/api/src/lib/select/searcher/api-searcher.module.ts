import { NgModule } from '@angular/core';
import { LuApiPagedSearcherComponent, LuApiSearcherComponent } from './api-searcher.component';

@NgModule({
	imports: [LuApiPagedSearcherComponent, LuApiSearcherComponent],
	exports: [LuApiSearcherComponent, LuApiPagedSearcherComponent],
})
export class LuApiSearcherModule {}
