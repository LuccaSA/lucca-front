import { NgModule } from '@angular/core';
import { LuDateAdapterPipe } from './date-adapter.pipe';

@NgModule({
	imports: [LuDateAdapterPipe],
	exports: [LuDateAdapterPipe],
})
export class LuDateAdapterModule {}
