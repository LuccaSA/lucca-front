import { NgModule } from '@angular/core';
import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { LU_POPUP_REF_FACTORY, LU_POPUP_CONFIG } from '../popup/index';
import { CommonModule } from '@angular/common';
import { LuSidepanel } from './sidepanel.service';
import { LU_SIDEPANEL_CONFIG, LU_SIDEPANEL_TRANSLATIONS } from './sidepanel.token';
import { luSidepanelTranslations } from './sidepanel.translate';
import { LuSidepanelIntl } from './sidepanel.intl';
import { LuSidepanelPanelComponent } from './sidepanel-panel.component';
import { luDefaultSidepanelConfig } from './sidepanel-config.default';
import { LuSidepanelRefFactory } from './sidepanel-ref.factory';


@NgModule({
	imports: [
		OverlayModule,
		PortalModule,
		CommonModule,
	],
	declarations: [LuSidepanelPanelComponent],
	entryComponents: [LuSidepanelPanelComponent],
	exports: [LuSidepanelPanelComponent],
	providers: [
		LuSidepanel,
		LuSidepanelIntl,
		{ provide: LU_POPUP_CONFIG, useValue: luDefaultSidepanelConfig },
		{ provide: LU_SIDEPANEL_CONFIG, useValue: luDefaultSidepanelConfig },
		{ provide: LU_POPUP_REF_FACTORY, useClass: LuSidepanelRefFactory },
		{ provide: LU_SIDEPANEL_TRANSLATIONS, useValue: luSidepanelTranslations },
	]
})
export class LuSidepanelModule {}
