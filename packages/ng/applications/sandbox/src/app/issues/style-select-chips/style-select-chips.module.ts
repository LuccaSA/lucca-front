import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';
import { StyleSelectChipsComponent } from './style-select-chips.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LuSelectModule } from '@lucca-front/ng/select';
import { LuOptionModule } from '@lucca-front/ng/option';
import { LuInputModule } from '@lucca-front/ng/input';



@NgModule({
	declarations: [
		StyleSelectChipsComponent,
	],
	imports: [
		LuSelectModule,
		LuOptionModule,
		FormsModule,
		LuInputModule,
		CommonModule,
		RouterModule.forChild([
			{ path: '', component: StyleSelectChipsComponent },
		]),
	],
})
export class StyleSelectChipsModule {}
