import { NgModule } from '@angular/core';
import { LuTreeOptionFeederModule } from './feeder/index';

@NgModule({
	imports: [
		LuTreeOptionFeederModule,
	],
	exports: [
		LuTreeOptionFeederModule,
	],
})
export class LuTreeOptionOperatorModule {}
