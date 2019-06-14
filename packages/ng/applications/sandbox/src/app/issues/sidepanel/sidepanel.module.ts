import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';
import { SidepanelComponent } from './sidepanel.component';



@NgModule({
	declarations: [
		SidepanelComponent,
	],
	imports: [

		RouterModule.forChild([
			{ path: '', component: SidepanelComponent },
		]),
	],
})
export class SidepanelModule {}
