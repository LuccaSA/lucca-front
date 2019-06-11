import { NgModule } from '@angular/core';
import { LuDepartmentFeederModule } from './feeder/index';

@NgModule({
	imports: [
		LuDepartmentFeederModule,
	],
	exports: [
		LuDepartmentFeederModule,
	],
})
export class LuDepartmentSelectModule {}
