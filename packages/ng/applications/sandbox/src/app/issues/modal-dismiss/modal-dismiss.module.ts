import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';
import { ModalDismissComponent, BasicModalContent, BasicPopupContent } from './modal-dismiss.component';
import {
	LuPopupModule,
	LuModalModule,
	LuSidepanelModule,
} from '@lucca-front/ng';
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
		LuPopupModule,
		LuModalModule,
		LuSidepanelModule,
		CommonModule,

		RouterModule.forChild([
			{ path: '', component: ModalDismissComponent },
		]),
	],
})
export class ModalDismissModule {}
