import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';
import { PocTranslateComponent } from './poc-translate.component';
import { LuUserDisplayModule, LuUserSelectModule } from '@lucca-front/ng';


@NgModule({
	declarations: [
		PocTranslateComponent,
	],
	imports: [

		RouterModule.forChild([
			{ path: '', component: PocTranslateComponent },
		]),
		LuUserDisplayModule,
		LuUserSelectModule,
	],
})
export class PocTranslateModule {}
