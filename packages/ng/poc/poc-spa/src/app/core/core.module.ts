import { NgModule } from '@angular/core';

import { CoreComponent } from './core.component';
import { PocCoreModule } from '@lf/poc/core';
import { RouterModule } from '@angular/router';
const routes = [
	{ path: '', component: CoreComponent },
];

@NgModule({
	declarations: [
		CoreComponent,
	],
	imports: [
		PocCoreModule,
		RouterModule.forChild(routes),
	],
})
export class CoreModule {}
