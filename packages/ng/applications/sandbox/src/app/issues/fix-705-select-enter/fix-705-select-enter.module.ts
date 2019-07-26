import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';
import { Fix705SelectEnterComponent } from './fix-705-select-enter.component';

// needed to reroute api calls to prisme-proxy
import { HttpClientModule } from '@angular/common/http';
import { RedirectModule } from '../../redirect';
import { LuApiModule, LuSelectModule, LuInputDisplayerModule, LuOptionModule } from '@lucca-front/ng';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@NgModule({
	declarations: [
		Fix705SelectEnterComponent,
	],
	imports: [
		LuSelectModule,
		LuApiModule,
		LuInputDisplayerModule,
		LuOptionModule,
		FormsModule,
		CommonModule,
		HttpClientModule,
		RedirectModule,
		RouterModule.forChild([
			{ path: '', component: Fix705SelectEnterComponent },
		]),
	],
})
export class Fix705SelectEnterModule {}
