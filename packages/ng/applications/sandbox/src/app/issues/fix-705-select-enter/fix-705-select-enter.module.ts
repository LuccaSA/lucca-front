import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';
import { Fix705SelectEnterComponent } from './fix-705-select-enter.component';

// needed to reroute api calls to prisme-proxy
import { HttpClientModule } from '@angular/common/http';
import { RedirectModule } from '../../redirect';
import { LuSelectModule } from '@lucca-front/ng/select';
import { LuOptionModule } from '@lucca-front/ng/option';
import { LuApiModule } from '@lucca-front/ng/api';
import { LuInputDisplayerModule } from '@lucca-front/ng/input';
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
