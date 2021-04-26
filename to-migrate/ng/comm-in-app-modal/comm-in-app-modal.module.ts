import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';
import { LuModalModule } from '@lucca-front/ng/modal';
import { CommInAppModalComponent } from './comm-in-app-modal.component';



@NgModule({
	declarations: [
		CommInAppModalComponent,
	],
	imports: [
		LuModalModule,
		RouterModule.forChild([
			{ path: '', component: CommInAppModalComponent },
		]),
	],
})
export class CommInAppModalModule {}
