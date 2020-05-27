import { NgModule } from '@angular/core';
import { LuTreeOptionFeederModule } from './feeder/index';
import { LuForTreeOptionsModule } from './for-options/index';
import { LuTreeOptionSearcherModule } from './searcher/index';
import { LuTreeOptionPagerModule } from './pager/index';
import { LuTreeOptionPlaceholderModule } from './placeholder/index';

@NgModule({
	imports: [
		LuTreeOptionFeederModule,
		LuForTreeOptionsModule,
		LuTreeOptionPagerModule,
		LuTreeOptionSearcherModule,
		LuTreeOptionPlaceholderModule,
	],
	exports: [
		LuTreeOptionFeederModule,
		LuForTreeOptionsModule,
		LuTreeOptionPagerModule,
		LuTreeOptionSearcherModule,
		LuTreeOptionPlaceholderModule,
	],
})
export class LuTreeOptionOperatorModule {}
