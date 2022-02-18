import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { LuDepartmentFeederComponent } from './department-feeder.component';

@NgModule({
	imports: [HttpClientModule],
	declarations: [LuDepartmentFeederComponent],
	exports: [LuDepartmentFeederComponent],
})
export class LuDepartmentFeederModule {}
