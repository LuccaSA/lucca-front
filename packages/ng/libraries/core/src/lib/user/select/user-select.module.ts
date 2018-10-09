import { NgModule } from '@angular/core';
import { LuUserSelectInputModule } from './input/index';
import { LuUserSearcherModule } from './searcher/index';

@NgModule({
	imports: [
		LuUserSelectInputModule,
		LuUserSearcherModule,
	],
	exports: [
		LuUserSelectInputModule,
		LuUserSearcherModule,
	],
})
export class LuUserSelectModule {}
