import { NgModule } from '@angular/core';
import { LuOptionFeederComponent } from './feeder';
import { LuForGroupsDirective } from './for-groups/index';
import { LuForOptionsDirective } from './for-options/index';
import { LuOptionPagerComponent } from './pager';
import { LuOptionSearcherComponent } from './searcher/index';

@NgModule({
	imports: [LuOptionPagerComponent, LuOptionFeederComponent, LuOptionSearcherComponent, LuForOptionsDirective, LuForGroupsDirective],
	exports: [LuOptionPagerComponent, LuOptionFeederComponent, LuOptionSearcherComponent, LuForOptionsDirective, LuForGroupsDirective],
})
export class LuOptionOperatorModule {}
