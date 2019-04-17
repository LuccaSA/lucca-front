import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';
import { RefactoOverlayAdvancedComponent } from './refacto-overlay-advanced.component';
import { LuOverlayModule } from '@lucca-front/ng';



@NgModule({
	declarations: [
		RefactoOverlayAdvancedComponent,
	],
	imports: [
		LuOverlayModule,

		RouterModule.forChild([
			{ path: '', component: RefactoOverlayAdvancedComponent },
		]),
	],
})
export class RefactoOverlayAdvancedModule {}
