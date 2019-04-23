import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';
import { RefactoOverlaysRepositionComponent } from './refacto-overlays-reposition.component';
import { LuOverlayModule } from '@lucca-front/ng';



@NgModule({
	declarations: [
		RefactoOverlaysRepositionComponent,
	],
	imports: [
		LuOverlayModule,
		RouterModule.forChild([
			{ path: '', component: RefactoOverlaysRepositionComponent },
		]),
	],
})
export class RefactoOverlaysRepositionModule {}
