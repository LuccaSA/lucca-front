import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';
import { SelectMeFirstComponent } from './select-me-first.component';



@NgModule({
	declarations: [
		SelectMeFirstComponent,
	],
	imports: [

		RouterModule.forChild([
			{ path: '', component: SelectMeFirstComponent },
		]),
	],
})
export class SelectMeFirstModule {}
