import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';
import { SplitOperatorsComponent } from './split-operators.component';
import { LuSelectModule } from '@lucca-front/ng/select';
import { LuOptionModule } from '@lucca-front/ng/option';
import { LuInputModule } from '@lucca-front/ng/input';
import { FormsModule } from '@angular/forms';



@NgModule({
	declarations: [
		SplitOperatorsComponent,
	],
	imports: [
		FormsModule,
		LuSelectModule,
		LuOptionModule,
		LuInputModule,
		RouterModule.forChild([
			{ path: '', component: SplitOperatorsComponent },
		]),
	],
})
export class SplitOperatorsModule {}
