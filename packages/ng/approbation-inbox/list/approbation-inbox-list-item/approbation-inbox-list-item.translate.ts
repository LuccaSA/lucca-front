import { InjectionToken } from '@angular/core';
import { LuTranslation } from '@lucca-front/ng/core';
import { Translations } from './translations';

export const LU_APPROBATION_INBOX_LIST_ITEM_TRANSLATIONS = new InjectionToken('LuApprobationInboxListItemTranslations', {
	factory: () => luApprobationInboxListItemTranslations,
});

export interface LuApprobationInboxListItemTranslations {
	selectItem: string;
}

export const luApprobationInboxListItemTranslations: LuTranslation<LuApprobationInboxListItemTranslations> = Translations;
