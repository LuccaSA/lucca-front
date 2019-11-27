import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';
import { PickerStructureComponent } from './picker-structure.component';
import { LuSelectModule } from '@lucca-front/ng/select';
import { LuOptionModule } from '@lucca-front/ng/option';
import { LuInputModule } from '@lucca-front/ng/input';
import { LuApiModule } from '@lucca-front/ng/api';
import { LuUserModule } from '@lucca-front/ng/user';
import { LuDepartmentModule } from '@lucca-front/ng/department';

import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { HttpClientModule } from '@angular/common/http';
import { RedirectModule } from '../../redirect';

@NgModule({
	declarations: [
		PickerStructureComponent,
	],
	imports: [
		LuApiModule,
		LuUserModule,
		LuDepartmentModule,
		LuSelectModule,
		LuOptionModule,
		FormsModule,
		LuInputModule,
		CommonModule,
		RouterModule.forChild([
			{ path: '', component: PickerStructureComponent },
		]),
		HttpClientModule,
		RedirectModule,
	],
})
export class PickerStructureModule {}
