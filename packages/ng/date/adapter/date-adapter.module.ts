import { NgModule } from '@angular/core';
import { LuDateAdapterPipe } from './date-adapter.pipe';

/**
 * @deprecated use `LuDateAdapterPipe` instead
 */
@NgModule({
	imports: [LuDateAdapterPipe],
	exports: [LuDateAdapterPipe],
})
export class LuDateAdapterModule {}
