import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';
import { EstablishmentComponent } from './establishment.component';
import { HttpClientModule } from '@angular/common/http';
import { RedirectModule } from '../../redirect';
import { LuEstablishmentModule } from '@lucca-front/ng/establishment';
import { FormsModule } from '@angular/forms';
import { LuSelectModule } from '@lucca-front/ng/select';
import { LuInputModule } from '@lucca-front/ng/input';
import { LuOptionModule } from '@lucca-front/ng/option';
import { CommonModule } from '@angular/common';



@NgModule({
	declarations: [
		EstablishmentComponent,
	],
	imports: [
		HttpClientModule,
		RedirectModule,
		LuEstablishmentModule,
		FormsModule,
		LuSelectModule,
		LuInputModule,
		LuOptionModule,
		CommonModule,
		RouterModule.forChild([
			{ path: '', component: EstablishmentComponent },
		]),
	],
})
export class EstablishmentModule {}
