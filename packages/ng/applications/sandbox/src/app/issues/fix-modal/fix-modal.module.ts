import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';
import { FixModalComponent, BasicModalContent } from './fix-modal.component';
import { LuPopupModule } from '@lucca-front/ng/popup';
import { LuModalModule } from '@lucca-front/ng/modal';
import { LuSidepanelModule } from '@lucca-front/ng/sidepanel';

@NgModule({
	declarations: [
		FixModalComponent,
		BasicModalContent,
	],
	imports: [
		LuPopupModule,
		LuModalModule,
		LuSidepanelModule,

		RouterModule.forChild([
			{ path: '', component: FixModalComponent },
		]),
	],
	entryComponents: [
		BasicModalContent,
	]
})
export class FixModalModule {}
