import { NgModule } from '@angular/core';

import { OverlayComponent } from './overlay.component';
import { PocOverlayModule } from '@lf/poc/overlay';
import { RouterModule } from '@angular/router';
const routes = [
	{ path: '', component: OverlayComponent },
];

@NgModule({
	declarations: [
		OverlayComponent,
	],
	imports: [
		PocOverlayModule,
		RouterModule.forChild(routes),
	],
})
export class OverlayModule {}
