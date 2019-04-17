import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';
import { RefactoOverlaysTooltipComponent } from './refacto-overlays-tooltip.component';


@NgModule({
	declarations: [
		RefactoOverlaysTooltipComponent,
	],
	imports: [

		RouterModule.forChild([
			{ path: '', component: RefactoOverlaysTooltipComponent },
		]),
	],
})
export class RefactoOverlaysTooltipModule {}
