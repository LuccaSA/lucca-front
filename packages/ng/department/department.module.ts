import { NgModule } from '@angular/core';
import { LuDepartmentSelectModule } from './select/index';

@NgModule({
	imports: [LuDepartmentSelectModule],
	exports: [LuDepartmentSelectModule],
})
export class LuDepartmentModule {}
