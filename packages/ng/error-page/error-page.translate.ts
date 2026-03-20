import { InjectionToken } from '@angular/core';
import { LuTranslation } from '@lucca-front/ng/core';
import { Translations } from './translations';

export const LU_ERROR_PAGE_TRANSLATIONS = new InjectionToken('LuErrorPageTranslations', {
	factory: () => luErrorPageTranslations,
});

export interface LuErrorPageLabel {
	backPrevious: string;
}

export const luErrorPageTranslations: LuTranslation<LuErrorPageLabel> = Translations;
