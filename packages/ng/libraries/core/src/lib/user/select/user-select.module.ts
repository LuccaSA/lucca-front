import { NgModule } from '@angular/core';
import { LuUserSelectInputModule } from './input/index';
import { LuUserSearcherModule } from './searcher/index';
import { LuUserHomonymsModule } from './homonyms/index';

@NgModule({
	imports: [
		LuUserSelectInputModule,
		LuUserSearcherModule,
		LuUserHomonymsModule,
	],
	exports: [
		LuUserSelectInputModule,
		LuUserSearcherModule,
		LuUserHomonymsModule,
	],
})
export class LuUserSelectModule {}
