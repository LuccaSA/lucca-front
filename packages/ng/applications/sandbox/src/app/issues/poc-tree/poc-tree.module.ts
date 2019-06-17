import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';
import { PocTreeComponent } from './poc-tree.component';
import { LuSelectModule, LuTreeModule, LuOptionPickerModule, LuInputDisplayerModule } from '@lucca-front/ng';
import { FormsModule } from '@angular/forms';



@NgModule({
	declarations: [
		PocTreeComponent,
	],
	imports: [
		LuInputDisplayerModule,
		LuSelectModule,
		LuTreeModule,
		FormsModule,
		LuOptionPickerModule,
		RouterModule.forChild([
			{ path: '', component: PocTreeComponent },
		]),
	],
})
export class PocTreeModule {}
