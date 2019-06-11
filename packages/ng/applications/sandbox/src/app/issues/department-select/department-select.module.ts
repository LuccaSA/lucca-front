import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';
import { DepartmentSelectComponent } from './department-select.component';

// needed to reroute api calls to prisme-proxy
import { HttpClientModule } from '@angular/common/http';
import { RedirectModule } from '../../redirect';


@NgModule({
	declarations: [
		DepartmentSelectComponent,
	],
	imports: [
		HttpClientModule,
		RedirectModule,
		RouterModule.forChild([
			{ path: '', component: DepartmentSelectComponent },
		]),
	],
})
export class DepartmentSelectModule {}
