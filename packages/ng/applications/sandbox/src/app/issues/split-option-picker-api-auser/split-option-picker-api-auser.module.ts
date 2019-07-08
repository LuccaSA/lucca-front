import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';
import { SplitOptionPickerApiAuserComponent } from './split-option-picker-api-auser.component';

// needed to reroute api calls to prisme-proxy
import { HttpClientModule } from '@angular/common/http';
import { RedirectModule } from '../../redirect';
import { FormsModule } from '@angular/forms';
import { LuUserSelectModule, LuApiSelectModule } from '@lucca-front/ng';


@NgModule({
	declarations: [
		SplitOptionPickerApiAuserComponent,
	],
	imports: [
		HttpClientModule,
		RedirectModule,
		FormsModule,
		LuUserSelectModule,
		LuApiSelectModule,
		RouterModule.forChild([
			{ path: '', component: SplitOptionPickerApiAuserComponent },
		]),
	],
})
export class SplitOptionPickerApiAuserModule {}
