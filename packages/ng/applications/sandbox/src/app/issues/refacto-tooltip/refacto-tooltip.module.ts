import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';
import { RefactoTooltipComponent } from './refacto-tooltip.component';
import { LuPopoverModule } from '@lucca-front/ng/popover';
import { LuTooltipModule } from '@lucca-front/ng/tooltip';



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
