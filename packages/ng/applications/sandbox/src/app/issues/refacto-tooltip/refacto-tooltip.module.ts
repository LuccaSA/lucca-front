import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';
import { RefactoTooltipComponent } from './refacto-tooltip.component';
import { LuTooltipModule, LuPopoverModule } from '@lucca-front/ng';



@NgModule({
	declarations: [
		RefactoTooltipComponent,
	],
	imports: [
		LuPopoverModule,
		LuTooltipModule,
		RouterModule.forChild([
			{ path: '', component: RefactoTooltipComponent },
		]),
	],
})
export class RefactoTooltipModule {}
