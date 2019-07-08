import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';
import { SplitOptionPickerComponent } from './split-option-picker.component';
import { LuSelectModule, LuInputDisplayerModule, LuOptionModule } from '@lucca-front/ng';
import { FormsModule } from '@angular/forms';



@NgModule({
	declarations: [
		SplitOptionPickerComponent,
	],
	imports: [
		LuSelectModule,
		LuOptionModule,
		LuInputDisplayerModule,
		FormsModule,
		RouterModule.forChild([
			{ path: '', component: SplitOptionPickerComponent },
		]),
	],
})
export class SplitOptionPickerModule {}
