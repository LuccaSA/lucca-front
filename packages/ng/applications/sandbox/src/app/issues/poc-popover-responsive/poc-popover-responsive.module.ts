import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';
import { PocPopoverResponsiveComponent } from './poc-popover-responsive.component';
import { LuPopoverModule } from '@lucca-front/ng/popover';
import { LuSelectModule } from '@lucca-front/ng/select';
import { LuInputModule } from '@lucca-front/ng/input';
import { LuOptionModule } from '@lucca-front/ng/option';
import { FormsModule } from '@angular/forms';



@NgModule({
	declarations: [
		PocPopoverResponsiveComponent,
	],
	imports: [
		LuPopoverModule,
		LuSelectModule,
		LuInputModule,
		LuOptionModule,
		FormsModule,
		RouterModule.forChild([
			{ path: '', component: PocPopoverResponsiveComponent },
		]),
	],
})
export class PocPopoverResponsiveModule {}
