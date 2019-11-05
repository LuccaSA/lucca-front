import { NgModule } from '@angular/core';

import { PrimaryComponent } from './primary.component';
import { PocCoreModule } from '@lf/poc';
import { RouterModule } from '@angular/router';
const routes = [
	{ path: '', component: PrimaryComponent },
];

@NgModule({
	declarations: [
		PrimaryComponent,
	],
	imports: [
		PocCoreModule,
		RouterModule.forChild(routes),
	],
})
export class PrimaryModule {}
