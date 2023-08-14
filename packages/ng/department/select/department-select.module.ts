import { NgModule } from '@angular/core';
import { LuDepartmentFeederComponent } from './feeder';
import { LuDepartmentSelectInputComponent } from './input';

@NgModule({
	imports: [LuDepartmentFeederComponent, LuDepartmentSelectInputComponent],
	exports: [LuDepartmentFeederComponent, LuDepartmentSelectInputComponent],
})
export class LuDepartmentSelectModule {}
