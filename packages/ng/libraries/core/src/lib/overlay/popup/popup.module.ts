import { NgModule } from '@angular/core';
import { OverlayModule } from '@angular/cdk/overlay';
import { LuPopup } from './popup.service';
import { LU_POPUP_CONFIG } from './popup.token';
import { luDefaultPopupConfig } from './popup-config.default';


@NgModule({
	imports: [
		OverlayModule,
	],
	exports: [],
	providers: [
		LuPopup,
		{ provide: LU_POPUP_CONFIG, useValue: luDefaultPopupConfig },
	]
})
export class LuPopupModule {}
