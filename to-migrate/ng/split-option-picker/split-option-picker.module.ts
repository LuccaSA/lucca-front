import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';
import { SplitOptionPickerComponent } from './split-option-picker.component';
import { LuSelectModule } from '@lucca-front/ng/select';
import { LuOptionModule } from '@lucca-front/ng/option';
import { LuInputModule } from '@lucca-front/ng/input';
import { FormsModule } from '@angular/forms';



@NgModule({
	declarations: [
		SplitOptionPickerComponent,
	],
	imports: [
		LuSelectModule,
		LuOptionModule,
		LuInputModule,
		FormsModule,
		RouterModule.forChild([
			{ path: '', component: SplitOptionPickerComponent },
		]),
	],
})
export class SplitOptionPickerModule {}
