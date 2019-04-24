import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';
import { PocPopupComponent, PocPopupInsideComponent } from './poc-popup.component';
import { LuPopupModule } from '@lucca-front/ng';



@NgModule({
	declarations: [
		PocPopupComponent,
		PocPopupInsideComponent,
	],
	imports: [
		LuPopupModule,
		RouterModule.forChild([
			{ path: '', component: PocPopupComponent },
		]),
	],
	entryComponents: [
		PocPopupInsideComponent,
	],
})
export class PocPopupModule {}
