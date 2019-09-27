import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';
import { OptionSelectorComponent } from './option-selector.component';



@NgModule({
	declarations: [
		OptionSelectorComponent,
	],
	imports: [

		RouterModule.forChild([
			{ path: '', component: OptionSelectorComponent },
		]),
	],
})
export class OptionSelectorModule {}
