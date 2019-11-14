import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';
import { RefactoOverlaysTooltipComponent } from './refacto-overlays-tooltip.component';
import { LuTooltipModule } from '@lucca-front/ng/tooltip';


@NgModule({
	declarations: [
		RefactoOverlaysTooltipComponent,
	],
	imports: [
		LuTooltipModule,
		RouterModule.forChild([
			{ path: '', component: RefactoOverlaysTooltipComponent },
		]),
	],
})
export class RefactoOverlaysTooltipModule {}
