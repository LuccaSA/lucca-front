import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';
import { TreePickerAdvancedComponent } from './tree-picker-advanced.component';
import { FormsModule } from '@angular/forms';
import { LuSelectModule } from '@lucca-front/ng/select';
import { LuTreeOptionModule } from '@lucca-front/ng/option';
import { LuInputModule } from '@lucca-front/ng/input';
import { CommonModule } from '@angular/common';



@NgModule({
	declarations: [
		TreePickerAdvancedComponent,
	],
	imports: [
		LuInputModule,
		LuSelectModule,
		LuTreeOptionModule,
		FormsModule,
		CommonModule,
		RouterModule.forChild([
			{ path: '', component: TreePickerAdvancedComponent },
		]),
	],
})
export class TreePickerAdvancedModule {}
