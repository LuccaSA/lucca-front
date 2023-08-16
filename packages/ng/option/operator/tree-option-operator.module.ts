import { NgModule } from '@angular/core';
import { LuTreeOptionFeederComponent } from './feeder/index';
import { LuForTreeOptionsDirective } from './for-options/index';
import { LuTreeOptionPagerComponent } from './pager/index';
import { LuTreeOptionSearcherModule } from './searcher/index';

@NgModule({
	imports: [LuTreeOptionFeederComponent, LuForTreeOptionsDirective, LuTreeOptionPagerComponent, LuTreeOptionSearcherModule],
	exports: [LuTreeOptionFeederComponent, LuForTreeOptionsDirective, LuTreeOptionPagerComponent, LuTreeOptionSearcherModule],
})
export class LuTreeOptionOperatorModule {}
