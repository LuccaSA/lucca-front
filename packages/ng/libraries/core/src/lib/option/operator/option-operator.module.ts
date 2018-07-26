import { NgModule } from '@angular/core';
import { LuOptionPagerModule } from './pager/index';
import { LuOptionFeederModule } from './feeder/index';
import { LuOptionTemplateModule } from './template/index';

@NgModule({
	imports: [
		LuOptionPagerModule,
		LuOptionFeederModule,
		LuOptionTemplateModule,
	],
	exports: [
		LuOptionPagerModule,
		LuOptionFeederModule,
		LuOptionTemplateModule,
	],
})
export class LuOptionOperatorModule {}
