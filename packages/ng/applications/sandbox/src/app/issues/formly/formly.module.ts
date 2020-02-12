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
import { LuNativeDateModule } from '@lucca-front/ng/date';


@NgModule({
	declarations: [
		FormlyComponent,
	],
	imports: [
		HttpClientModule,
		RedirectModule,
		LuFormlyModule,
		LuNativeDateModule,
		FormsModule,
		NgxFormlyModule.forRoot(),
		ReactiveFormsModule,
		CommonModule,
		RouterModule.forChild([
			{ path: '', component: FormlyComponent },
		]),
	],
})
export class FormlyModule {}
