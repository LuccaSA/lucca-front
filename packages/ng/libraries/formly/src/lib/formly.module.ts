import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FormlyModule } from '@ngx-formly/core';
import { LU_FORMLY_COMPONENTS, LU_FORMLY_CONFIG } from './formly.config';
import { LuDateModule } from '@lucca-front/ng/date';
import { LuSelectModule } from '@lucca-front/ng/select';
import { LuInputModule } from '@lucca-front/ng/input';
import { LuUserSelectModule } from '@lucca-front/ng/user';
import { LuOptionModule } from '@lucca-front/ng/option';
import { LuApiSelectModule } from '@lucca-front/ng/api';
import { LuDepartmentSelectModule } from '@lucca-front/ng/department';

@NgModule({
	declarations: [...LU_FORMLY_COMPONENTS],
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,

		LuSelectModule,
		LuOptionModule,
		LuUserSelectModule,
		LuInputModule,
		LuApiSelectModule,
		LuDepartmentSelectModule,
		LuDateModule,

		FormlyModule.forChild(LU_FORMLY_CONFIG),
	],
})
export class LuFormlyModule {}
