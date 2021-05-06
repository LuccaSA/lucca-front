import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';
import { SplitOperatorsApiComponent } from './split-operators-api.component';

// needed to reroute api calls to prisme-proxy
import { HttpClientModule } from '@angular/common/http';
import { RedirectModule } from '../../redirect';
import { FormsModule } from '@angular/forms';
import { LuSelectModule } from '@lucca-front/ng/select';
import { LuOptionModule } from '@lucca-front/ng/option';
import { LuInputModule } from '@lucca-front/ng/input';
import { LuApiModule } from '@lucca-front/ng/api';
import { LuUserModule } from '@lucca-front/ng/user';

@NgModule({
	declarations: [
		SplitOperatorsApiComponent,
	],
	imports: [
		HttpClientModule,
		RedirectModule,
		RouterModule.forChild([
			{ path: '', component: SplitOperatorsApiComponent },
		]),
		FormsModule,
		LuUserModule,
		LuApiModule,
		LuSelectModule,
		LuOptionModule,
		LuInputModule,
	],
})
export class SplitOperatorsApiModule {}
