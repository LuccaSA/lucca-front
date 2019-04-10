import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { BogusComponent } from './bogus.component';
import { LuUserDisplayModule, LuUserSelectModule } from '@lucca-front/ng';
import { RedirectModule } from '../../redirect';

@NgModule({
	declarations: [
		BogusComponent,
	],
	imports: [
		HttpClientModule,
		RedirectModule,
		RouterModule.forChild([
			{ path: '', component: BogusComponent },
		]),
		LuUserDisplayModule,
		LuUserSelectModule,
	],
})
export class BogusModule {}
