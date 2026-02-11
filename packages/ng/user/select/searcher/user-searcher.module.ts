import { NgModule } from '@angular/core';
import { LuUserPagedSearcherComponent } from './user-searcher.component';

/**
 * @deprecated use `LuUserPagedSearcherComponent` instead
 */
@NgModule({
	imports: [LuUserPagedSearcherComponent],
	exports: [LuUserPagedSearcherComponent],
})
export class LuUserSearcherModule {}
