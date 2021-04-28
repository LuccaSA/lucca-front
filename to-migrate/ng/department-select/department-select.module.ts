import { NgModule, LOCALE_ID } from '@angular/core';

import { RouterModule } from '@angular/router';
import { DepartmentSelectComponent } from './department-select.component';

// needed to reroute api calls to prisme-proxy
import { HttpClientModule } from '@angular/common/http';
import { RedirectModule } from '../../redirect';

import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { LuSelectModule } from '@lucca-front/ng/select';
import { LuTreeOptionModule } from '@lucca-front/ng/option';
import { LuDepartmentModule } from '@lucca-front/ng/department';
import { LuInputDisplayerModule } from '@lucca-front/ng/input';

@NgModule({
	declarations: [
		DepartmentSelectComponent,
	],
	imports: [
		HttpClientModule,
		RedirectModule,
		LuDepartmentModule,
		LuInputDisplayerModule,
		LuSelectModule,
		LuTreeOptionModule,
		FormsModule,
		CommonModule,
		RouterModule.forChild([
			{ path: '', component: DepartmentSelectComponent },
		]),
	],
	providers: [
		{ provide: LOCALE_ID, useValue: 'fr-FR' },
	]

})
export class DepartmentSelectModule {}
