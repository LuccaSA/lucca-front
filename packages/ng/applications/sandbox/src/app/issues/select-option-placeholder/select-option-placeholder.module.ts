import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';
import { SelectOptionPlaceholderComponent } from './select-option-placeholder.component';
import { LuSelectModule } from '@lucca-front/ng/select';
import { LuOptionModule } from '@lucca-front/ng/option';
import { LuInputModule } from '@lucca-front/ng/input';
import { FormsModule } from '@angular/forms';


@NgModule({
	declarations: [
		SelectOptionPlaceholderComponent,
	],
	imports: [
		FormsModule,
		LuSelectModule,
		LuOptionModule,
		LuInputModule,
		RouterModule.forChild([
			{ path: '', component: SelectOptionPlaceholderComponent },
		]),
	],
})
export class SelectOptionPlaceholderModule {}
