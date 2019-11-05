import { NgModule } from '@angular/core';
import { PocOverlayComponent } from './poc-overlay.component';
import { PocCoreModule } from '@lf/poc/core';



@NgModule({
	declarations: [PocOverlayComponent],
	imports: [
		PocCoreModule,
	],
	exports: [PocOverlayComponent]
})
export class PocOverlayModule { }
