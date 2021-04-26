import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';
import { FormlyComponent } from './formly.component';

// needed to reroute api calls to prisme-proxy
import { HttpClientModule } from '@angular/common/http';
import { RedirectModule } from '../../redirect';
import { LuFormlyModule } from '@lucca-front/ng/formly';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormlyModule as NgxFormlyModule } from '@ngx-formly/core';
import { CommonModule } from '@angular/common';
import { ALuDateAdapter, LuNativeDateAdapter } from '@lucca-front/ng/core';


@NgModule({
	declarations: [
		FormlyComponent,
	],
	imports: [
		HttpClientModule,
		RedirectModule,
		LuFormlyModule,
		FormsModule,
		NgxFormlyModule.forRoot(),
		ReactiveFormsModule,
		CommonModule,
		RouterModule.forChild([
			{ path: '', component: FormlyComponent },
		]),
	],
	providers: [
		{ provide: ALuDateAdapter, useClass: LuNativeDateAdapter },
	]
})
export class FormlyModule {}
