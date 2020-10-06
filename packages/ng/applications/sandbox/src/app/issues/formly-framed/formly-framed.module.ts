import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';
import { FormlyFramedComponent } from './formly-framed.component';

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
		FormlyFramedComponent,
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
			{ path: '', component: FormlyFramedComponent },
		]),
	],
	providers: [
		{ provide: ALuDateAdapter, useClass: LuNativeDateAdapter },
	]
})
export class FormlyFramedModule {}
