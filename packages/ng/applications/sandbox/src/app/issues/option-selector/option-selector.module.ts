import { NgModule, LOCALE_ID } from '@angular/core';

import { RouterModule } from '@angular/router';
import { OptionSelectorComponent } from './option-selector.component';
import { LuSelectModule, LuOptionModule, LuInputModule, LuTreeOptionModule } from '@lucca-front/ng';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';



@NgModule({
	declarations: [
		OptionSelectorComponent,
	],
	imports: [
		LuSelectModule,
		LuOptionModule,
		LuTreeOptionModule,
		FormsModule,
		LuInputModule,
		CommonModule,
		RouterModule.forChild([
			{ path: '', component: OptionSelectorComponent },
		]),
	],
	providers: [
		{ provide: LOCALE_ID, useValue: 'fr-FR' },
	]
})
export class OptionSelectorModule {}
