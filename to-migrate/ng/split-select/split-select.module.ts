import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';
import { SplitSelectComponent } from './split-select.component';

// needed to reroute api calls to prisme-proxy
import { HttpClientModule } from '@angular/common/http';
import { RedirectModule } from '../../redirect';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LuSelectModule } from '@lucca-front/ng/select';
import { LuOptionModule } from '@lucca-front/ng/option';
import { LuInputModule } from '@lucca-front/ng/input';
import { LuApiModule } from '@lucca-front/ng/api';
import { LuUserModule } from '@lucca-front/ng/user';


@NgModule({
	declarations: [
		SplitSelectComponent,
	],
	imports: [
		LuSelectModule,
		LuOptionModule,
		LuInputModule,
		LuUserModule,
		LuApiModule,
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		HttpClientModule,
		RedirectModule,
		RouterModule.forChild([
			{ path: '', component: SplitSelectComponent },
		]),
	],
})
export class SplitSelectModule {}
