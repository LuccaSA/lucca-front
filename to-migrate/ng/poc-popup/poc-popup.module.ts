import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';
import { PocPopupComponent, PocPopupInsideComponent, PocPopupSecondaryComponent } from './poc-popup.component';
import { LuPopupModule } from '@lucca-front/ng/popup';



@NgModule({
	declarations: [
		PocPopupComponent,
		PocPopupInsideComponent,
		PocPopupSecondaryComponent,
	],
	imports: [
		LuPopupModule,
		RouterModule.forChild([
			{ path: '', component: PocPopupComponent },
		]),
	],
	entryComponents: [
		PocPopupInsideComponent,
		PocPopupSecondaryComponent,
	],
})
export class PocPopupModule {}
