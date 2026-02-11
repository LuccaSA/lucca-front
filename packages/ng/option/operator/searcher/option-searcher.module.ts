import { NgModule } from '@angular/core';
import { LuOptionSearcherComponent } from './option-searcher.component';

/**
 * @deprecated use `LuOptionSearcherComponent` instead
 */
@NgModule({
	imports: [LuOptionSearcherComponent],
	exports: [LuOptionSearcherComponent],
})
export class LuOptionSearcherModule {}
