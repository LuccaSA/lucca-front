import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';
import { RefactorApiSelectComponent } from './refactor-api-select.component';

// needed to reroute api calls to prisme-proxy
import { HttpClientModule } from '@angular/common/http';
import { RedirectModule } from '../../redirect';


@NgModule({
	declarations: [
		RefactorApiSelectComponent,
	],
	imports: [
		HttpClientModule,
		RedirectModule,
		RouterModule.forChild([
			{ path: '', component: RefactorApiSelectComponent },
		]),
	],
})
export class RefactorApiSelectModule {}
