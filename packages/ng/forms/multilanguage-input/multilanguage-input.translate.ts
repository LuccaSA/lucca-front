import { InjectionToken } from '@angular/core';
import { Translations } from './translations';

export interface LuMultilanguageInputTranslations {
	clear: string;
	toggleMultilanguage: string;
	translateTo: string;
	translateWithAI: string;
}

export const LU_MULTILANGUAGE_INPUT_TRANSLATIONS = new InjectionToken('LuMultilanguageInputTranslations', {
	factory: () => Translations,
});
