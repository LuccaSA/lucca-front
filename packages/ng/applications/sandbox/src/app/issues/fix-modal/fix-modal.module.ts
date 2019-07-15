import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';
import { FixModalComponent, BasicModalContent } from './fix-modal.component';
import { LuOverlayModule } from '@lucca-front/ng';

@NgModule({
	declarations: [
		FixModalComponent,
		BasicModalContent,
	],
	imports: [
		LuOverlayModule,

		RouterModule.forChild([
			{ path: '', component: FixModalComponent },
		]),
	],
	entryComponents: [
		BasicModalContent,
	]
})
export class FixModalModule {}
