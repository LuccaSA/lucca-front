import { NgModule } from '@angular/core';
import { LuOptionPagerModule } from './pager/index';
import { LuOptionFeederModule } from './feeder/index';
import { LuOptionSearcherModule } from './searcher/index';
import { LuOptionTemplateModule } from './template/index';
import { LuOptionsModule } from './options/index';

@NgModule({
	imports: [
		LuOptionPagerModule,
		LuOptionFeederModule,
		LuOptionTemplateModule,
		LuOptionSearcherModule,
		LuOptionsModule,
	],
	exports: [
		LuOptionPagerModule,
		LuOptionFeederModule,
		LuOptionTemplateModule,
		LuOptionSearcherModule,
		LuOptionsModule,
	],
})
export class LuOptionOperatorModule {}
