import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';
import { ModalSynchedComponent, SyncModalContent, AsyncModalContent } from './modal-synched.component';
import {
	LuModalModule,
	LuSidepanelModule,
} from '@lucca-front/ng';



@NgModule({
	declarations: [
		ModalSynchedComponent,
		SyncModalContent,
		AsyncModalContent,
	],
	entryComponents: [
		SyncModalContent,
		AsyncModalContent,
	],
	imports: [
		LuModalModule,
		LuSidepanelModule,

		RouterModule.forChild([
			{ path: '', component: ModalSynchedComponent },
		]),
	],
})
export class ModalSynchedModule {}
