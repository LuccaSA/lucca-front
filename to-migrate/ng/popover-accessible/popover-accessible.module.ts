import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';
import { PopoverAccessibleComponent } from './popover-accessible.component';
import { LuPopoverModule } from '@lucca-front/ng/popover';



@NgModule({
	declarations: [
		PopoverAccessibleComponent,
	],
	imports: [
		LuPopoverModule,
		RouterModule.forChild([
			{ path: '', component: PopoverAccessibleComponent },
		]),
	],
})
export class PopoverAccessibleModule {}
