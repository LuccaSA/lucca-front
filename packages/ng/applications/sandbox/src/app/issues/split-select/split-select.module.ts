import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';
import { SplitSelectComponent } from './split-select.component';

// needed to reroute api calls to prisme-proxy
import { HttpClientModule } from '@angular/common/http';
import { RedirectModule } from '../../redirect';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LuModule } from '@lucca-front/ng';


@NgModule({
	declarations: [
		SplitSelectComponent,
	],
	imports: [
		LuModule,
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
