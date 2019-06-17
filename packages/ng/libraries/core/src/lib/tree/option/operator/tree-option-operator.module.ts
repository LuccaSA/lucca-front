import { NgModule } from '@angular/core';
import { LuTreeOptionFeederModule } from './feeder/index';
import { LuForTreeOptionsModule } from './for-tree-options/index';

@NgModule({
	imports: [
		LuTreeOptionFeederModule,
		LuForTreeOptionsModule,
	],
	exports: [
		LuTreeOptionFeederModule,
		LuForTreeOptionsModule,
	],
})
export class LuTreeOptionOperatorModule {}
