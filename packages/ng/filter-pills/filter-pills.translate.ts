import { InjectionToken } from '@angular/core';
import { LuTranslation } from '@lucca-front/ng/core';
import { Translations } from './translations';

export const LU_FILTER_PILLS_TRANSLATIONS = new InjectionToken('LuFilterPillsTranslations', {
	factory: () => luFilterPillsTranslations,
});

export interface LuFilterPillsLabel {
	clear: string;
	placeholder: string;
	additionalFilters: string;
}

export const luFilterPillsTranslations: LuTranslation<LuFilterPillsLabel> = Translations;
