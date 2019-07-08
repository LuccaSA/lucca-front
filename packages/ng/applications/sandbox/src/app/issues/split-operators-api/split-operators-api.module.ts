import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';
import { SplitOperatorsApiComponent } from './split-operators-api.component';

// needed to reroute api calls to prisme-proxy
import { HttpClientModule } from '@angular/common/http';
import { RedirectModule } from '../../redirect';
import { FormsModule } from '@angular/forms';
import { LuUserSelectModule, LuApiSelectModule, LuSelectModule, LuOptionModule, LuInputDisplayerModule, LuUserDisplayModule } from '@lucca-front/ng';

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
		LuUserSelectModule,
		LuApiSelectModule,
		LuSelectModule,
		LuOptionModule,
		LuInputDisplayerModule,
		LuUserDisplayModule,
	],
})
export class SplitOperatorsApiModule {}
