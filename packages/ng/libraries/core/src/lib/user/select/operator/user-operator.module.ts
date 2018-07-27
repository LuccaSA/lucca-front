import { NgModule } from '@angular/core';
import { LuUserFeederModule } from './feeder/index';

@NgModule({
	imports: [
		LuUserFeederModule,
	],
	exports: [
		LuUserFeederModule,
	],
})
export class LuUserOperatorModule {}
