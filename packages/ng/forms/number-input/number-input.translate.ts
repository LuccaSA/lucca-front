import { InjectionToken } from '@angular/core';
import { LuTranslation } from '@lucca-front/ng/core';
import { Translations } from './translations';

export const LU_NUMBERFIELD_TRANSLATIONS = new InjectionToken('LuNumberFieldTranslations', {
	factory: () => luNumberFieldTranslations,
});

export interface LuNumberFieldLabel {
	clear: string;
}

export const luNumberFieldTranslations: LuTranslation<LuNumberFieldLabel> = Translations;
