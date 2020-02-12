import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';
import { ModalsNoSubmitComponent, BasicModalContent } from './modals-no-submit.component';
import { LuModalModule } from '@lucca-front/ng/modal';
import { LuSidepanelModule } from '@lucca-front/ng/sidepanel';

@NgModule({
	declarations: [
		ModalsNoSubmitComponent,
		BasicModalContent,
	],
	entryComponents: [
		BasicModalContent,
	],
	imports: [
		LuModalModule,
		LuSidepanelModule,

		RouterModule.forChild([
			{ path: '', component: ModalsNoSubmitComponent },
		]),
	],
})
export class ModalsNoSubmitModule {}
