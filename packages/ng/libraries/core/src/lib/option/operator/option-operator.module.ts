import { NgModule } from '@angular/core';
import { LuOptionPagerModule } from './pager/index';
import { LuOptionFeederModule } from './feeder/index';
import { LuOptionSearcherModule } from './searcher/index';
import { LuOptionTemplateModule } from './template/index';

@NgModule({
	imports: [
		LuOptionPagerModule,
		LuOptionFeederModule,
		LuOptionTemplateModule,
		LuOptionSearcherModule,
	],
	exports: [
		LuOptionPagerModule,
		LuOptionFeederModule,
		LuOptionTemplateModule,
		LuOptionSearcherModule,
	],
})
export class LuOptionOperatorModule {}
