import { NgModule } from '@angular/core';
import { LuModal } from './modal.service';
import { LU_MODAL_CONFIG, LU_MODAL_TRANSLATIONS, LU_MODAL_REF_FACTORY } from './modal.token';
import { luDefaultModalConfig } from './modal-config.default';
import { LuModalPanelComponent, LuModalPanelComponentDefaultCD } from './modal-panel.component';
import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { LuModalRefFactory } from './modal-ref.factory';
import { LuModalIntl } from './modal.intl';
import { luModalTranslations } from './modal.translate';
import { CommonModule } from '@angular/common';
import { A11yModule } from '@angular/cdk/a11y';

@NgModule({
	imports: [OverlayModule, PortalModule, CommonModule, A11yModule],
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
