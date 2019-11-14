import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';
import { PocTreeComponent } from './poc-tree.component';
import { LuSelectModule, LuTreeOptionModule, LuInputDisplayerModule } from '@lucca-front/ng';
import { FormsModule } from '@angular/forms';



@NgModule({
	declarations: [
		PocTreeComponent,
	],
	imports: [
		LuInputDisplayerModule,
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
