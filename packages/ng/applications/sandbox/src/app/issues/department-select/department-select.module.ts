import { NgModule, LOCALE_ID } from '@angular/core';

import { RouterModule } from '@angular/router';
import { DepartmentSelectComponent } from './department-select.component';

// needed to reroute api calls to prisme-proxy
import { HttpClientModule } from '@angular/common/http';
import { RedirectModule } from '../../redirect';

import { FormsModule } from '@angular/forms';
import { LuSelectModule, LuTreeOptionModule, LuDepartmentModule, LuInputDisplayerModule } from '@lucca-front/ng';
import { CommonModule } from '@angular/common';

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
