import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';
import { IvyOptionPickerComponent } from './ivy-option-picker.component';
import { LuSelectModule } from '@lucca-front/ng/select';
import { LuInputModule } from '@lucca-front/ng/input';
import { LuOptionModule } from '@lucca-front/ng/option';



@NgModule({
	declarations: [
		IvyOptionPickerComponent,
	],
	imports: [
		LuSelectModule,
		LuInputModule,
		LuOptionModule,
		RouterModule.forChild([
			{ path: '', component: IvyOptionPickerComponent },
		]),
	],
})
export class IvyOptionPickerModule {}
