import { InjectionToken } from '@angular/core';
import { LuPluralForms, LuTranslation } from '@lucca-front/ng/core';
import { Translations } from './translations';

export const LU_FILTER_PILLS_TRANSLATIONS = new InjectionToken('LuFilterPillsTranslations', {
	factory: () => luFilterPillsTranslations,
});

export interface LuFilterPillsLabel {
	clear: string;
	placeholder: string;
	additionalFilters: string;
	autoApplyAnnouncement: string;
	selectView: string;
	viewOptions: string;
	renameView: string;
	deleteView: string;
	resultsCount: LuPluralForms;
	noResults: string;
}

export const luFilterPillsTranslations: LuTranslation<LuFilterPillsLabel> = Translations;
