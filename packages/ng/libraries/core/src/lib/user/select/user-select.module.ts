import { NgModule } from '@angular/core';
import { LuUserSelectInputModule } from './input/index';
import { LuUserOperatorModule } from './operator/index';
import { LuUserSearcherModule } from './searcher/index';

@NgModule({
	imports: [
		LuUserSelectInputModule,
		LuUserOperatorModule,
		LuUserSearcherModule,
	],
	exports: [
		LuUserSelectInputModule,
		LuUserOperatorModule,
		LuUserSearcherModule,
	],
})
export class LuUserSelectModule {}
