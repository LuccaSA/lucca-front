import { NgModule } from '@angular/core';
import { LuOptionPagerModule } from './pager/index';
import { LuOptionFeederModule } from './feeder/index';
import { LuOptionSearcherModule } from './searcher/index';
import { LuForOptionsModule } from './for-options/index';
import { LuForGroupsModule } from './for-groups/index';

@NgModule({
	imports: [LuOptionPagerModule, LuOptionFeederModule, LuOptionSearcherModule, LuForOptionsModule, LuForGroupsModule],
	exports: [LuOptionPagerModule, LuOptionFeederModule, LuOptionSearcherModule, LuForOptionsModule, LuForGroupsModule],
})
export class LuOptionOperatorModule {}
