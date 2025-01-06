import { InjectionToken } from '@angular/core';
import { LuTranslation } from '@lucca-front/ng/core';
import { Translations } from './translations';

export const LU_LINK_TRANSLATIONS = new InjectionToken('LuDate2Translations', {
	factory: () => luLinkTranslations,
});

export interface Date2Translate {
	external: string;
}

export const luLinkTranslations: LuTranslation<Date2Translate> = Translations;
