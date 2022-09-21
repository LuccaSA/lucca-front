import { A11yModule } from '@angular/cdk/a11y';
import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LuTooltipModule } from '@lucca-front/ng/tooltip';
import { luDefaultSidepanelConfig } from './sidepanel-config.default';
import { LuSidepanelPanelComponent, LuSidepanelPanelComponentDefaultCD } from './sidepanel-panel.component';
import { LuSidepanelRefFactory } from './sidepanel-ref.factory';
import { LuSidepanelIntl } from './sidepanel.intl';
import { LuSidepanel } from './sidepanel.service';
import { LU_SIDEPANEL_CONFIG, LU_SIDEPANEL_REF_FACTORY, LU_SIDEPANEL_TRANSLATIONS } from './sidepanel.token';
import { luSidepanelTranslations } from './sidepanel.translate';

@NgModule({
	imports: [OverlayModule, CommonModule, A11yModule, LuTooltipModule],
	declarations: [LuSidepanelPanelComponent, LuSidepanelPanelComponentDefaultCD],
	exports: [LuSidepanelPanelComponent, LuSidepanelPanelComponentDefaultCD],
	providers: [
		LuSidepanel,
		LuSidepanelIntl,
		{ provide: LU_SIDEPANEL_CONFIG, useValue: luDefaultSidepanelConfig },
		{ provide: LU_SIDEPANEL_REF_FACTORY, useClass: LuSidepanelRefFactory },
		{ provide: LU_SIDEPANEL_TRANSLATIONS, useValue: luSidepanelTranslations },
	],
})
export class LuSidepanelModule {}
