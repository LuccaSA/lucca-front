import { NgModule } from '@angular/core';
import { LuDepartmentFeederModule } from './feeder/index';
import { LuDepartmentSelectInputModule } from './input/index';

@NgModule({
	imports: [LuDepartmentFeederModule, LuDepartmentSelectInputModule],
	exports: [LuDepartmentFeederModule, LuDepartmentSelectInputModule],
})
export class LuDepartmentSelectModule {}
