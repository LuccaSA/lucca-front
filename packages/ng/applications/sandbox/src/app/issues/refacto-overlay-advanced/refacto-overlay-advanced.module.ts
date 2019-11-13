import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';
import { RefactoOverlayAdvancedComponent } from './refacto-overlay-advanced.component';
import { LuPopupModule, LuPopoverModule, LuTooltipModule } from '@lucca-front/ng';



@NgModule({
	declarations: [
		RefactoOverlayAdvancedComponent,
	],
	imports: [
		LuPopupModule,
		LuPopoverModule,
		LuTooltipModule,

		RouterModule.forChild([
			{ path: '', component: RefactoOverlayAdvancedComponent },
		]),
	],
})
export class RefactoOverlayAdvancedModule {}
