import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';
import { UserSelectHomonymsComponent } from './user-select-homonyms.component';
import { LuUserModule } from '@lucca-front/ng/user';

// needed to reroute api calls to prisme-proxy
import { HttpClientModule } from '@angular/common/http';
import { RedirectModule } from '../../redirect';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@NgModule({
	declarations: [
		UserSelectHomonymsComponent,
	],
	imports: [
		FormsModule,
		CommonModule,
		LuUserModule,
		HttpClientModule,
		RedirectModule,
		RouterModule.forChild([
			{ path: '', component: UserSelectHomonymsComponent },
		]),
	],
})
export class UserSelectHomonymsModule {}
