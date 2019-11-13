import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';
import { ModalsNoSubmitComponent, BasicModalContent } from './modals-no-submit.component';
import {
	LuModalModule,
	LuSidepanelModule,
} from '@lucca-front/ng';

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
