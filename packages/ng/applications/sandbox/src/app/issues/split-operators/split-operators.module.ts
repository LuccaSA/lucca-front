import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';
import { SplitOperatorsComponent } from './split-operators.component';
import { LuSelectModule, LuInputDisplayerModule, LuOptionModule } from '@lucca-front/ng';
import { FormsModule } from '@angular/forms';



@NgModule({
	declarations: [
		SplitOperatorsComponent,
	],
	imports: [
		FormsModule,
		LuSelectModule,
		LuOptionModule,
		LuInputDisplayerModule,
		RouterModule.forChild([
			{ path: '', component: SplitOperatorsComponent },
		]),
	],
})
export class SplitOperatorsModule {}
