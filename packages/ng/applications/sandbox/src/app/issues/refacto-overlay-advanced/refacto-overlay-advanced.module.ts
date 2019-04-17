import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';
import { RefactoOverlayAdvancedComponent } from './refacto-overlay-advanced.component';



@NgModule({
	declarations: [
		RefactoOverlayAdvancedComponent,
	],
	imports: [

		RouterModule.forChild([
			{ path: '', component: RefactoOverlayAdvancedComponent },
		]),
	],
})
export class RefactoOverlayAdvancedModule {}
