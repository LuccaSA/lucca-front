import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';
import { UserSelectTranslateComponent } from './user-select-translate.component';

// needed to reroute api calls to prisme-proxy
import { HttpClientModule } from '@angular/common/http';
import { RedirectModule } from '../../redirect';


@NgModule({
	declarations: [
		UserSelectTranslateComponent,
	],
	imports: [
		HttpClientModule,
		RedirectModule,
		RouterModule.forChild([
			{ path: '', component: UserSelectTranslateComponent },
		]),
	],
})
export class UserSelectTranslateModule {}
