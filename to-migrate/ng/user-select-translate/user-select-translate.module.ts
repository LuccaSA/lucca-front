import { NgModule, LOCALE_ID } from '@angular/core';

import { RouterModule } from '@angular/router';
import { UserSelectTranslateComponent } from './user-select-translate.component';

// needed to reroute api calls to prisme-proxy
import { HttpClientModule } from '@angular/common/http';
import { RedirectModule } from '../../redirect';
import { FormsModule } from '@angular/forms';
import { LuUserModule } from '@lucca-front/ng/user';
import { CommonModule } from '@angular/common';


@NgModule({
	declarations: [
		UserSelectTranslateComponent,
	],
	imports: [
		HttpClientModule,
		RedirectModule,
		FormsModule,
		LuUserModule,
		CommonModule,
		RouterModule.forChild([
			{ path: '', component: UserSelectTranslateComponent },
		]),
	],
	providers: [
		{ provide: LOCALE_ID, useValue: 'fr-FR' },
	]
})
export class UserSelectTranslateModule {}
