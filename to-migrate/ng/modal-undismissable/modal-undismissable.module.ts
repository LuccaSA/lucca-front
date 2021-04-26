import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';
import { ModalUndismissableComponent, BasicModalContent, BasicPopupContent } from './modal-undismissable.component';
import { LuPopupModule } from '@lucca-front/ng/popup';
import { LuModalModule } from '@lucca-front/ng/modal';
import { LuSidepanelModule } from '@lucca-front/ng/sidepanel';
import { FormsModule } from '@angular/forms';


@NgModule({
	declarations: [
		ModalUndismissableComponent,
		BasicModalContent,
		BasicPopupContent,
	],
	entryComponents: [
		BasicModalContent,
		BasicPopupContent,
	],
	imports: [
		FormsModule,
		LuPopupModule,
		LuModalModule,
		LuSidepanelModule,
		RouterModule.forChild([
			{ path: '', component: ModalUndismissableComponent },
		]),
	],
})
export class ModalUndismissableModule {}
