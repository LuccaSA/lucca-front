import { NgModule } from '@angular/core';

import { AllComponent } from './all.component';
import { PocModule } from '@lf/poc';
import { RouterModule } from '@angular/router';
const routes = [
	{ path: '', component: AllComponent },
];

@NgModule({
	declarations: [
		AllComponent,
	],
	imports: [
		PocModule,
		RouterModule.forChild(routes),
	],
})
export class AllModule {}
