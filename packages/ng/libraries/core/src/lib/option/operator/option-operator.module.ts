import { NgModule } from '@angular/core';
import { LuOptionPagerModule } from './pager/index';
import { LuOptionFeederModule } from './feeder/index';

@NgModule({
	imports: [
		LuOptionPagerModule,
		LuOptionFeederModule,
	],
	exports: [
		LuOptionPagerModule,
		LuOptionFeederModule,
	],
})
export class LuOptionOperatorModule {}
