import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';
import { RefactoOverlayAdvancedComponent } from './refacto-overlay-advanced.component';
import { LuPopupModule, LuTooltipModule } from '@lucca-front/ng';



@NgModule({
	declarations: [
		RefactoOverlayAdvancedComponent,
	],
	imports: [
		LuPopupModule,
		LuTooltipModule,

		RouterModule.forChild([
			{ path: '', component: RefactoOverlayAdvancedComponent },
		]),
	],
})
export class RefactoOverlayAdvancedModule {}
