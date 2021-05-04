import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';
import { FormlyWrappersComponent } from './formly-wrappers.component';

import { HttpClientModule } from '@angular/common/http';
import { RedirectModule } from '../../redirect';
import { LuFormlyModule } from '@lucca-front/ng/formly';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormlyModule as NgxFormlyModule } from '@ngx-formly/core';
import { CommonModule } from '@angular/common';


@NgModule({
	declarations: [
		FormlyWrappersComponent,
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
			{ path: '', component: FormlyWrappersComponent },
		]),
	],
})
export class FormlyWrappersModule {}
