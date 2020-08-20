import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';
import { FormerEmployeesComponent } from './former-employees.component';

import { HttpClientModule } from '@angular/common/http';
import { RedirectModule } from '../../redirect';
import { LuUserModule } from '@lucca-front/ng/user';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@NgModule({
	declarations: [
		FormerEmployeesComponent,
	],
	imports: [
		HttpClientModule,
		RedirectModule,
		FormsModule,
		CommonModule,

		LuUserModule,
		RouterModule.forChild([
			{ path: '', component: FormerEmployeesComponent },
		]),
	],
})
export class FormerEmployeesModule {}
