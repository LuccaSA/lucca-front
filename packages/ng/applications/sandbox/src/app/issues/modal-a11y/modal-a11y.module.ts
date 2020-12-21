import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';
import { LuModalModule } from '@lucca-front/ng/modal';
import { BasicModalContent } from './modal-a11y.component';
import { ModalA11yComponent } from './modal-a11y.component';



@NgModule({
	declarations: [
		ModalA11yComponent,
		BasicModalContent,
	],
	imports: [
		RouterModule.forChild([
			{ path: '', component: ModalA11yComponent },
		]),
		LuModalModule
	],
})
export class ModalA11yModule {}
