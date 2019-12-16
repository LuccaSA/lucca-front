import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';
import { PocPopoverResponsiveComponent } from './poc-popover-responsive.component';
import { LuPopoverModule } from '@lucca-front/ng/popover';



@NgModule({
	declarations: [
		PocPopoverResponsiveComponent,
	],
	imports: [
		LuPopoverModule,

		RouterModule.forChild([
			{ path: '', component: PocPopoverResponsiveComponent },
		]),
	],
})
export class PocPopoverResponsiveModule {}
