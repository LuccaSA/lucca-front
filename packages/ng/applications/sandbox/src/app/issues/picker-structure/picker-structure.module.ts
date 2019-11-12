import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';
import { PickerStructureComponent } from './picker-structure.component';
import { LuSelectModule, LuOptionModule, LuInputModule, LuApiModule, LuUserModule, LuDepartmentModule } from '@lucca-front/ng';
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
