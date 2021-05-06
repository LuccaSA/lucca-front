import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';
import { RefactoOverlaysComponent } from './refacto-overlays.component';
import { LuPopoverModule } from '@lucca-front/ng/popover';


@NgModule({
	declarations: [
		RefactoOverlaysComponent,
	],
	imports: [
		LuPopoverModule,

		RouterModule.forChild([
			{ path: '', component: RefactoOverlaysComponent },
		]),
	],
})
export class RefactoOverlaysModule {}
