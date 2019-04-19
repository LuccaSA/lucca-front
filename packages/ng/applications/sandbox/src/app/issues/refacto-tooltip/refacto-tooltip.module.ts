import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';
import { RefactoTooltipComponent } from './refacto-tooltip.component';
import { LuOverlayModule } from '@lucca-front/ng';



@NgModule({
	declarations: [
		RefactoTooltipComponent,
	],
	imports: [
		LuOverlayModule,
		RouterModule.forChild([
			{ path: '', component: RefactoTooltipComponent },
		]),
	],
})
export class RefactoTooltipModule {}
