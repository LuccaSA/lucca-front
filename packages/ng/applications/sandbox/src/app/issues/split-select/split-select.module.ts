import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';
import { SplitSelectComponent } from './split-select.component';

// needed to reroute api calls to prisme-proxy
import { HttpClientModule } from '@angular/common/http';
import { RedirectModule } from '../../redirect';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LuSelectModule, LuUserModule, LuApiModule } from '@lucca-front/ng';
import { LuOptionModule } from '@lucca-front/ng';
import { LuInputModule } from '@lucca-front/ng';


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
		HttpClientModule,
		RedirectModule,
		RouterModule.forChild([
			{ path: '', component: SplitSelectComponent },
		]),
	],
})
export class SplitSelectModule {}
