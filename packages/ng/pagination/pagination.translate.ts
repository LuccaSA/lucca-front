import { InjectionToken } from '@angular/core';
import { LuTranslation } from '@lucca-front/ng/core';
import { Translations } from './translations';

export const LU_PAGINATION_TRANSLATIONS = new InjectionToken('LuPaginationTranslations', {
	factory: () => luPaginationTranslations,
});

export interface LuPaginationLabel {
	results: string;
	previous: string;
	next: string;
	resultsA11y: string;
}

export const luPaginationTranslations: LuTranslation<LuPaginationLabel> = Translations;
