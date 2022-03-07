import { A11yModule } from '@angular/cdk/a11y';
import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LuTooltipModule } from '@lucca-front/ng/tooltip';
import { luDefaultModalConfig } from './modal-config.default';
import { LuModalPanelComponent, LuModalPanelComponentDefaultCD } from './modal-panel.component';
import { LuModalRefFactory } from './modal-ref.factory';
import { LuModalIntl } from './modal.intl';
import { LuModal } from './modal.service';
import { LU_MODAL_CONFIG, LU_MODAL_REF_FACTORY, LU_MODAL_TRANSLATIONS } from './modal.token';
import { luModalTranslations } from './modal.translate';

@NgModule({
	imports: [OverlayModule, PortalModule, CommonModule, A11yModule, LuTooltipModule],
	declarations: [LuModalPanelComponent, LuModalPanelComponentDefaultCD],
	entryComponents: [LuModalPanelComponent, LuModalPanelComponentDefaultCD],
	exports: [LuModalPanelComponent, LuModalPanelComponentDefaultCD],
	providers: [
		LuModal,
		LuModalIntl,
		{ provide: LU_MODAL_CONFIG, useValue: luDefaultModalConfig },
		{ provide: LU_MODAL_REF_FACTORY, useClass: LuModalRefFactory },
		{ provide: LU_MODAL_TRANSLATIONS, useValue: luModalTranslations },
	],
})
export class LuModalModule {}
