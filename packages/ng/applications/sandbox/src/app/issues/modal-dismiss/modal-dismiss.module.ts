import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';
import { ModalDismissComponent, BasicModalContent, BasicPopupContent } from './modal-dismiss.component';
import { LuOverlayModule } from '@lucca-front/ng';
import { CommonModule } from '@angular/common';



@NgModule({
	declarations: [
		ModalDismissComponent,
		BasicModalContent,
		BasicPopupContent,
	],
	entryComponents: [
		BasicModalContent,
		BasicPopupContent,
	],
	imports: [
		LuOverlayModule,
		CommonModule,

		RouterModule.forChild([
			{ path: '', component: ModalDismissComponent },
		]),
	],
})
export class ModalDismissModule {}
