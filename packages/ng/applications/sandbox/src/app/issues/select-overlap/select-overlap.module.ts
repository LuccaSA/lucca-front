import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';
import { SelectOverlapComponent } from './select-overlap.component';
import { LuSelectModule, LuOptionModule, LuInputModule, LuApiModule, LuUserModule, LuDepartmentModule } from '@lucca-front/ng';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RedirectModule } from '../../redirect';



@NgModule({
	declarations: [
		SelectOverlapComponent,
	],
	imports: [
		LuSelectModule,
		LuOptionModule,
		FormsModule,
		LuInputModule,
		CommonModule,
		RouterModule.forChild([
			{ path: '', component: SelectOverlapComponent },
		]),
		HttpClientModule,
		RedirectModule,
		LuApiModule,
		LuUserModule,
		LuDepartmentModule,
	],
})
export class SelectOverlapModule {}
