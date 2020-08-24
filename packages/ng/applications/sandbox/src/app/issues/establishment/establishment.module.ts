import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';
import { EstablishmentComponent } from './establishment.component';
import { HttpClientModule } from '@angular/common/http';
import { RedirectModule } from '../../redirect';
import { LuEstablishmentModule } from '@lucca-front/ng/establishment';
import { FormsModule } from '@angular/forms';



@NgModule({
	declarations: [
		EstablishmentComponent,
	],
	imports: [
		HttpClientModule,
		RedirectModule,
		LuEstablishmentModule,
		FormsModule,

		RouterModule.forChild([
			{ path: '', component: EstablishmentComponent },
		]),
	],
})
export class EstablishmentModule {}
