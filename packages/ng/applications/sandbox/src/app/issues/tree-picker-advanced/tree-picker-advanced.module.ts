import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';
import { TreePickerAdvancedComponent } from './tree-picker-advanced.component';



@NgModule({
	declarations: [
		TreePickerAdvancedComponent,
	],
	imports: [

		RouterModule.forChild([
			{ path: '', component: TreePickerAdvancedComponent },
		]),
	],
})
export class TreePickerAdvancedModule {}
