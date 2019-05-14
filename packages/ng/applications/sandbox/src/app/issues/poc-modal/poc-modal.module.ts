import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';
import { PocModalComponent, PocModalInsideComponent } from './poc-modal.component';
import { LuModalModule } from '@lucca-front/ng';



@NgModule({
	declarations: [
		PocModalComponent,
		PocModalInsideComponent,
	],
	entryComponents: [PocModalInsideComponent],
	imports: [
		LuModalModule,
		RouterModule.forChild([
			{ path: '', component: PocModalComponent },
		]),
	],
})
export class PocModalModule {}
