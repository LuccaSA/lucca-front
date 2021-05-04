import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';
import { ApiV4Component } from './api-v4.component';
import { HttpClientModule } from '@angular/common/http';
import { RedirectModule } from '../../redirect';
import { LuApiModule } from '@lucca-front/ng/api';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@NgModule({
	declarations: [
		ApiV4Component,
	],
	imports: [
		HttpClientModule,
		RedirectModule,
		LuApiModule,
		FormsModule,
		CommonModule,
		RouterModule.forChild([
			{ path: '', component: ApiV4Component },
		]),
	],
})
export class ApiV4Module {}
