import { NgModule } from '@angular/core';
import { OverlayModule } from '@angular/cdk/overlay';
import { LuPopup } from './popup.service';
import { LU_POPUP_CONFIG, LU_POPUP_REF_FACTORY } from './popup.token';
import { luDefaultPopupConfig } from './popup-config.default';
import { LuPopupRefFactory } from './popup-ref.factory';

@NgModule({
	imports: [OverlayModule],
	exports: [],
	providers: [LuPopup, { provide: LU_POPUP_CONFIG, useValue: luDefaultPopupConfig }, { provide: LU_POPUP_REF_FACTORY, useClass: LuPopupRefFactory }],
})
export class LuPopupModule {}
