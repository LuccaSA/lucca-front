import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';
import { RefactoOverlayAdvancedComponent } from './refacto-overlay-advanced.component';
import { LuPopupModule } from '@lucca-front/ng/popup';
import { LuPopoverModule } from '@lucca-front/ng/popover';
import { LuTooltipModule } from '@lucca-front/ng/tooltip';



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
