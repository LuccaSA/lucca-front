import { InjectionToken } from '@angular/core';
import { ILuTranslation } from '@lucca-front/ng/core';

export const LU_MULTILANGUAGE_INPUT_TRANSLATIONS = new InjectionToken('LuMultilanguageInputTranslations', {
	factory: () => luMultilanguageInputTranslations,
});

export interface LuMultilanguageInputTranslations {
	clear: string;
	toggleMultilanguage: string;
	translateTo: string;
}

export const luMultilanguageInputTranslations: ILuTranslation<LuMultilanguageInputTranslations> = {
	en: {
		clear: 'Empty this field',
		toggleMultilanguage: 'Show translations',
		translateTo: 'Translate to {{lang}}',
	},
	fr: {
		clear: 'Vider ce champ',
		toggleMultilanguage: 'Afficher les traductions',
		translateTo: 'Traduire en {{lang}}',
	},
};
