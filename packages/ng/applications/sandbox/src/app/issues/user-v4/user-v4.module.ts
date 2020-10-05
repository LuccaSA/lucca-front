import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';
import { UserV4Component } from './user-v4.component';

import { HttpClientModule } from '@angular/common/http';
import { RedirectModule } from '../../redirect';
import { FormsModule } from '@angular/forms';
import { ALuUserService, LuUserModule, LuUserV4Service } from '@lucca-front/ng/user';
import { CommonModule } from '@angular/common';

@NgModule({
	declarations: [
		UserV4Component,
	],
	imports: [
		HttpClientModule,
		RedirectModule,
		FormsModule,
		LuUserModule,
		CommonModule,

		RouterModule.forChild([
			{ path: '', component: UserV4Component },
		]),
	],
	providers: [
		// { provide: ALuUserService, useClass: LuUserV4Service },
	]
})
export class UserV4Module {}
