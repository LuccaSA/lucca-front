import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';
import { OptionSelectorComponent } from './option-selector.component';
import { LuSelectModule, LuOptionModule, LuInputModule } from '@lucca-front/ng';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';



@NgModule({
	declarations: [
		OptionSelectorComponent,
	],
	imports: [
		LuSelectModule,
		LuOptionModule,
		FormsModule,
		LuInputModule,
		CommonModule,
		RouterModule.forChild([
			{ path: '', component: OptionSelectorComponent },
		]),
	],
})
export class OptionSelectorModule {}
