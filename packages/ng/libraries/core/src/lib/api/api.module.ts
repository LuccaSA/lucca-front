import { NgModule } from '@angular/core';
import { LuApiFeederModule } from './feeder/index';

@NgModule({
	imports: [
		LuApiFeederModule,
	],
	exports: [
		LuApiFeederModule,
	],
})
export class LuApiModule {}
