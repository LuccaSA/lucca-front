import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';
import { ModalDismissComponent, BasicModalContent, BasicPopupContent } from './modal-dismiss.component';
import { LuPopupModule } from '@lucca-front/ng/popup';
import { LuModalModule } from '@lucca-front/ng/modal';
import { LuSidepanelModule } from '@lucca-front/ng/sidepanel';
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
