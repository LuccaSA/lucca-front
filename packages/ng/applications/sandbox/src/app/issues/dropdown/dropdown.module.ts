import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';
import { DropdownComponent } from './dropdown.component';
import { LuPopoverModule } from '@lucca-front/ng/popover';
import { CommonModule } from '@angular/common';



@NgModule({
	declarations: [
		DropdownComponent,
	],
	imports: [
		CommonModule,
		LuPopoverModule,
		RouterModule.forChild([
			{ path: '', component: DropdownComponent },
		]),
	],
})
export class DropdownModule {}
