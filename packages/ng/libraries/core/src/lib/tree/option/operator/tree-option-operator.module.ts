import { NgModule } from '@angular/core';
import { LuTreeOptionFeederModule } from './feeder/index';
import { LuForTreeOptionsModule } from './for-tree-options/index';
import { LuTreeOptionSearcherModule } from './searcher/index';

@NgModule({
	imports: [
		LuTreeOptionFeederModule,
		LuForTreeOptionsModule,
		LuTreeOptionSearcherModule,
	],
	exports: [
		LuTreeOptionFeederModule,
		LuForTreeOptionsModule,
		LuTreeOptionSearcherModule,
	],
})
export class LuTreeOptionOperatorModule {}
