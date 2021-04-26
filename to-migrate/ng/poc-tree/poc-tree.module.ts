import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';
import { PocTreeComponent } from './poc-tree.component';
import { LuSelectModule } from '@lucca-front/ng/select';
import { LuInputModule } from '@lucca-front/ng/input';
import { LuTreeOptionModule } from '@lucca-front/ng/option';
import { FormsModule } from '@angular/forms';



@NgModule({
	declarations: [
		PocTreeComponent,
	],
	imports: [
		LuInputModule,
		LuSelectModule,
		LuTreeOptionModule,
		FormsModule,
		// LuOptionPickerModule,
		RouterModule.forChild([
			{ path: '', component: PocTreeComponent },
		]),
	],
})
export class PocTreeModule {}
