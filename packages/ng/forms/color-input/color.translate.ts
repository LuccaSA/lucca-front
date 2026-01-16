import { InjectionToken } from '@angular/core';
import { LuTranslation } from '@lucca-front/ng/core';
import { Translations } from './translations';

export const LU_COLOR_TRANSLATIONS = new InjectionToken('luColorTranslations', {
	factory: () => luColorTranslations,
});

export interface LuColorLabel {
	color: string;
}

export const luColorTranslations: LuTranslation<LuColorLabel> = Translations;
