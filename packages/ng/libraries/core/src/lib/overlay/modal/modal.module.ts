import { NgModule } from '@angular/core';
import { LuModal } from './modal.service';
import { LU_MODAL_CONFIG, LU_MODAL_TRANSLATIONS } from './modal.token';
import { luDefaultModalConfig } from './modal-config.default';
import { LuModalPanelComponent } from './modal-panel.component';
import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { LU_POPUP_REF_FACTORY, LU_POPUP_CONFIG } from '../popup/index';
import { LuModalRefFactory } from './modal-ref.factory';
import { LuModalIntl } from './modal.intl';
import { luModalTranslations } from './modal.translate';
import { CommonModule } from '@angular/common';


@NgModule({
	imports: [
		OverlayModule,
		PortalModule,
		CommonModule,
	],
	declarations: [LuModalPanelComponent],
	entryComponents: [LuModalPanelComponent],
	exports: [LuModalPanelComponent],
	providers: [
		LuModal,
		LuModalIntl,
		{ provide: LU_POPUP_CONFIG, useValue: luDefaultModalConfig },
		{ provide: LU_MODAL_CONFIG, useValue: luDefaultModalConfig },
		{ provide: LU_POPUP_REF_FACTORY, useClass: LuModalRefFactory },
		{ provide: LU_MODAL_TRANSLATIONS, useValue: luModalTranslations },
	]
})
export class LuModalModule {}
