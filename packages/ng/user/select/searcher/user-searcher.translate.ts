import { InjectionToken } from '@angular/core';
import { LuTranslation } from '@lucca-front/ng/core';
import { Translations } from './translations';

export const LU_USER_SEARCHER_TRANSLATIONS = new InjectionToken('LuUserSearcherTranslations', {
	factory: () => luUserSearcherTranslations,
});

export interface ILuUserSearcherLabel {
	includeFormerEmployees: string;
}

export const luUserSearcherTranslations: LuTranslation<ILuUserSearcherLabel> = Translations;
