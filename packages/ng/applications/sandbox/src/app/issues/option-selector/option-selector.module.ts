import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';
import { OptionSelectorComponent } from './option-selector.component';
import { LuSelectModule, LuOptionModule } from '@lucca-front/ng';



@NgModule({
	declarations: [
		OptionSelectorComponent,
	],
	imports: [
		LuSelectModule,
		LuOptionModule,
		RouterModule.forChild([
			{ path: '', component: OptionSelectorComponent },
		]),
	],
})
export class OptionSelectorModule {}
