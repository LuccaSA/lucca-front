import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';
import { RefactoOverlaysComponent } from './refacto-overlays.component';


@NgModule({
	declarations: [
		RefactoOverlaysComponent,
	],
	imports: [

		RouterModule.forChild([
			{ path: '', component: RefactoOverlaysComponent },
		]),
	],
})
export class RefactoOverlaysModule {}
