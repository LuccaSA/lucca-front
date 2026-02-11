import { NgModule } from '@angular/core';
import { LuDepartmentSelectModule } from './select/index';

/**
 * @deprecated use `LuDepartmentFeederComponent, LuDepartmentSelectInputComponent` instead
 */
@NgModule({
	imports: [LuDepartmentSelectModule],
	exports: [LuDepartmentSelectModule],
})
export class LuDepartmentModule {}
