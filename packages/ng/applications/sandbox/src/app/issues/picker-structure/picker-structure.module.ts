import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';
import { PickerStructureComponent } from './picker-structure.component';
import { LuSelectModule, LuOptionModule, LuInputModule } from '@lucca-front/ng';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';



@NgModule({
	declarations: [
		PickerStructureComponent,
	],
	imports: [
		LuSelectModule,
		LuOptionModule,
		FormsModule,
		LuInputModule,
		CommonModule,
		RouterModule.forChild([
			{ path: '', component: PickerStructureComponent },
		]),
	],
})
export class PickerStructureModule {}
