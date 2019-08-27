import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';
import { ModalDismissComponent, ModalContennt } from './modal-dismiss.component';
import { LuOverlayModule } from '@lucca-front/ng';



@NgModule({
	declarations: [
		ModalDismissComponent,
		ModalContennt,
	],
	entryComponents: [
		ModalContennt,
	],
	imports: [
		LuOverlayModule,
		RouterModule.forChild([
			{ path: '', component: ModalDismissComponent },
		]),
	],
})
export class ModalDismissModule {}
