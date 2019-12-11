import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';
import { IvyApiSelectComponent } from './ivy-api-select.component';

// needed to reroute api calls to prisme-proxy
import { HttpClientModule } from '@angular/common/http';
import { RedirectModule } from '../../redirect';
import { LuSelectModule } from '@lucca-front/ng/select';
import { LuInputModule } from '@lucca-front/ng/input';
import { LuOptionModule } from '@lucca-front/ng/option';
import { LuApiModule } from '@lucca-front/ng/api';
import { FormsModule } from '@angular/forms';

@NgModule({
	declarations: [
		IvyApiSelectComponent,
	],
	imports: [
		LuSelectModule,
		LuInputModule,
		LuOptionModule,
		LuApiModule,
		FormsModule,
		HttpClientModule,
		RedirectModule,
		RouterModule.forChild([
			{ path: '', component: IvyApiSelectComponent },
		]),
	],
})
export class IvyApiSelectModule {}
