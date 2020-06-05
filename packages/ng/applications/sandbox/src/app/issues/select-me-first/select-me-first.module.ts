import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';
import { SelectMeFirstComponent } from './select-me-first.component';
import { LuUserModule } from '@lucca-front/ng/user';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RedirectModule } from '../../redirect';
import { CommonModule } from '@angular/common';



@NgModule({
	declarations: [
		SelectMeFirstComponent,
	],
	imports: [
		HttpClientModule,
		RedirectModule,
		LuUserModule,
		FormsModule,
		CommonModule,
		RouterModule.forChild([
			{ path: '', component: SelectMeFirstComponent },
		]),
	],
})
export class SelectMeFirstModule {}
