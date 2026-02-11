import { NgModule } from '@angular/core';
import { LuDepartmentFeederComponent } from './feeder';
import { LuDepartmentSelectInputComponent } from './input';

/**
 * @deprecated use `LuDepartmentFeederComponent, LuDepartmentSelectInputComponent` instead
 */
@NgModule({
	imports: [LuDepartmentFeederComponent, LuDepartmentSelectInputComponent],
	exports: [LuDepartmentFeederComponent, LuDepartmentSelectInputComponent],
})
export class LuDepartmentSelectModule {}
