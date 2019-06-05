import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';
import { PocTreeComponent } from './poc-tree.component';



@NgModule({
	declarations: [
		PocTreeComponent,
	],
	imports: [

		RouterModule.forChild([
			{ path: '', component: PocTreeComponent },
		]),
	],
})
export class PocTreeModule {}
