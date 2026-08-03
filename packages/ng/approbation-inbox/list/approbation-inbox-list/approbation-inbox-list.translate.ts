import { InjectionToken } from '@angular/core';
import { LuPluralForms, LuTranslation } from '@lucca-front/ng/core';
import { Translations } from './translations';

export const LU_APPROBATION_INBOX_LIST_TRANSLATIONS = new InjectionToken('LuApprobationInboxListTranslations', {
	factory: () => luApprobationInboxListTranslations,
});

export interface LuApprobationInboxListTranslations {
	selectAll: string;
	selectedCount: LuPluralForms;
}

export const luApprobationInboxListTranslations: LuTranslation<LuApprobationInboxListTranslations> = Translations;
