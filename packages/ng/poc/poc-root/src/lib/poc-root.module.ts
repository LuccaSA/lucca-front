import { NgModule } from '@angular/core';
import { PocCoreModule } from '@lf/poc/core';
import { PocOverlayModule } from '@lf/poc/overlay';



@NgModule({
	imports: [
		PocCoreModule,
		PocOverlayModule,
	],
	exports: [
		PocCoreModule,
		PocOverlayModule,
	],
})
export class PocModule { }
