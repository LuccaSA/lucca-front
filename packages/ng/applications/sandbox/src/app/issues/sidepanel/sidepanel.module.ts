import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';
import { SidepanelComponent, PocSidepanelInsideComponent } from './sidepanel.component';
import { LuSidepanelModule } from '@lucca-front/ng/sidepanel';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';



@NgModule({
	declarations: [
		SidepanelComponent,
		PocSidepanelInsideComponent,
	],
	entryComponents: [
		PocSidepanelInsideComponent,
	],
	imports: [
		LuSidepanelModule,
		FormsModule,
		CommonModule,
		RouterModule.forChild([
			{ path: '', component: SidepanelComponent },
		]),
	],
})
export class SidepanelModule {}
