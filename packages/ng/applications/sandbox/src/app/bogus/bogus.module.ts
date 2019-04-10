import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { BogusComponent } from './bogus.component';
import { LuUserDisplayModule } from '@lucca-front/ng';

@NgModule({
	declarations: [
		BogusComponent,
	],
	imports: [
		RouterModule.forChild([
			{ path: '', component: BogusComponent },
		]),
		LuUserDisplayModule,
	],
})
export class BogusModule {}
