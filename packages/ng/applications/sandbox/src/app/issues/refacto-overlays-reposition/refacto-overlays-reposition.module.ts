import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';
import { RefactoOverlaysRepositionComponent } from './refacto-overlays-reposition.component';
import { LuPopoverModule } from '@lucca-front/ng';



@NgModule({
	declarations: [
		RefactoOverlaysRepositionComponent,
	],
	imports: [
		LuPopoverModule,
		RouterModule.forChild([
			{ path: '', component: RefactoOverlaysRepositionComponent },
		]),
	],
})
export class RefactoOverlaysRepositionModule {}
