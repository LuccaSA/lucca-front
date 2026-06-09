import { InjectionToken } from '@angular/core';
import { LuTranslation } from '@lucca-front/ng/core';
import { Translations } from './translations';

export interface LuMultilanguageInputTranslations {
	clear: string;
	toggleMultilanguage: string;
	translateTo: string;
	translateWithAI: string;
	invariantInfo: string;
	requiredError: string;
}

export const LU_MULTILANGUAGE_INPUT_TRANSLATIONS = new InjectionToken('LuMultilanguageInputTranslations', {
	factory: () => Translations as LuTranslation<LuMultilanguageInputTranslations>,
});
