import { NgModule } from '@angular/core';
import { OverlayModule } from '@angular/cdk/overlay';
import { LuPopup } from './popup.service';


@NgModule({
	imports: [
		OverlayModule,
	],
	exports: [
	],
	providers: [
		LuPopup,
	]
})
export class LuPopupModule {}
