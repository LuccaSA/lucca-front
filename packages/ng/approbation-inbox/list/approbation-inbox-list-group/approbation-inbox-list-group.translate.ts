import { InjectionToken } from '@angular/core';
import { LuTranslation } from '@lucca-front/ng/core';
import { Translations } from './translations';

export const LU_APPROBATION_INBOX_LIST_GROUP_TRANSLATIONS = new InjectionToken('LuApprobationInboxListGroupTranslations', {
	factory: () => luApprobationInboxListGroupTranslations,
});

export interface LuApprobationInboxListGroupTranslations {
	selectGroup: string;
}

export const luApprobationInboxListGroupTranslations: LuTranslation<LuApprobationInboxListGroupTranslations> = Translations;
