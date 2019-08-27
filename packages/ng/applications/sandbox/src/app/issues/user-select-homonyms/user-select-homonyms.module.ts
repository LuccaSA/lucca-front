import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';
import { UserSelectHomonymsComponent } from './user-select-homonyms.component';
import { LuUserModule } from '@lucca-front/ng';

// needed to reroute api calls to prisme-proxy
import { HttpClientModule } from '@angular/common/http';
import { RedirectModule } from '../../redirect';


@NgModule({
	declarations: [
		UserSelectHomonymsComponent,
	],
	imports: [
		LuUserModule,
		HttpClientModule,
		RedirectModule,
		RouterModule.forChild([
			{ path: '', component: UserSelectHomonymsComponent },
		]),
	],
})
export class UserSelectHomonymsModule {}
