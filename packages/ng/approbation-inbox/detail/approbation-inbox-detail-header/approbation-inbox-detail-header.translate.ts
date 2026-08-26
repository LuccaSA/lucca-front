import { InjectionToken } from '@angular/core';
import { LuTranslation } from '@lucca-front/ng/core';
import { Translations } from './translations';

export const LU_APPROBATION_INBOX_DETAIL_HEADER_TRANSLATIONS = new InjectionToken('LuApprobationInboxDetailHeaderTranslations', {
	factory: () => luApprobationInboxDetailHeaderTranslations,
});

export interface LuApprobationInboxDetailHeaderTranslations {
	delegation: string;
}

export const luApprobationInboxDetailHeaderTranslations: LuTranslation<LuApprobationInboxDetailHeaderTranslations> = Translations;
