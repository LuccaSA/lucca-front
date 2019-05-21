import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';
import { PocModalComponent, PocModalInsideComponent } from './poc-modal.component';
import { LuModalModule } from '@lucca-front/ng';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';



@NgModule({
	declarations: [
		PocModalComponent,
		PocModalInsideComponent,
	],
	entryComponents: [PocModalInsideComponent],
	imports: [
		LuModalModule,
		FormsModule,
		CommonModule,
		RouterModule.forChild([
			{ path: '', component: PocModalComponent },
		]),
	],
})
export class PocModalModule {}
