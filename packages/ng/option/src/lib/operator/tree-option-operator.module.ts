import { NgModule } from '@angular/core';
import { LuTreeOptionFeederModule } from './feeder/index';
import { LuForTreeOptionsModule } from './for-options/index';
import { LuTreeOptionSearcherModule } from './searcher/index';
import { LuTreeOptionPagerModule } from './pager/index';

@NgModule({
	imports: [LuTreeOptionFeederModule, LuForTreeOptionsModule, LuTreeOptionPagerModule, LuTreeOptionSearcherModule],
	exports: [LuTreeOptionFeederModule, LuForTreeOptionsModule, LuTreeOptionPagerModule, LuTreeOptionSearcherModule],
})
export class LuTreeOptionOperatorModule {}
