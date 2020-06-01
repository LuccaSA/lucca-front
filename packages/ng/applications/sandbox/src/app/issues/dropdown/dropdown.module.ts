import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';
import { DropdownComponent } from './dropdown.component';
import { LuPopoverModule } from '@lucca-front/ng/popover';
import { LuDropdownModule } from '@lucca-front/ng/dropdown';
import { CommonModule } from '@angular/common';



@NgModule({
	declarations: [
		DropdownComponent,
	],
	imports: [
		CommonModule,
		LuPopoverModule,
		LuDropdownModule,
		RouterModule.forChild([
			{ path: '', component: DropdownComponent },
		]),
	],
})
export class DropdownModule {}
