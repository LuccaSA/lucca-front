import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';
import { PocTreeComponent } from './poc-tree.component';
import { LuSelectModule, LuTreeModule, LuOptionPickerModule, LuInputDisplayerModule } from '@lucca-front/ng';



@NgModule({
	declarations: [
		PocTreeComponent,
	],
	imports: [
		LuInputDisplayerModule,
		LuSelectModule,
		LuTreeModule,
		LuOptionPickerModule,
		RouterModule.forChild([
			{ path: '', component: PocTreeComponent },
		]),
	],
})
export class PocTreeModule {}
