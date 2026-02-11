import { OverlayModule } from '@angular/cdk/overlay';
import { NgModule } from '@angular/core';
import { luDefaultPopupConfig } from './popup-config.default';
import { LuPopupRefFactory } from './popup-ref.factory';
import { LuPopup } from './popup.service';
import { LU_POPUP_CONFIG, LU_POPUP_REF_FACTORY } from './popup.token';

/**
 * @deprecated use `OverlayModule` imports && `LuPopup, { provide: LU_POPUP_CONFIG, useValue: luDefaultPopupConfig }, { provide: LU_POPUP_REF_FACTORY, useClass: LuPopupRefFactory }` providers instead
 */
@NgModule({
	imports: [OverlayModule],
	exports: [],
	providers: [LuPopup, { provide: LU_POPUP_CONFIG, useValue: luDefaultPopupConfig }, { provide: LU_POPUP_REF_FACTORY, useClass: LuPopupRefFactory }],
})
export class LuPopupModule {}
