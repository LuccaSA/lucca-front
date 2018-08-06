import { NgModule } from '@angular/core';
import { LuApiFeederModule } from './feeder/index';
import { LuApiSearcherModule } from './searcher/index';

@NgModule({
	imports: [
		LuApiFeederModule,
		LuApiSearcherModule,
	],
	exports: [
		LuApiFeederModule,
		LuApiSearcherModule,
	],
})
export class LuApiSelectModule {}
