import { InjectionToken } from '@angular/core';
import { ILuTranslation } from '@lucca-front/ng/core';

export const LU_I18n_TEXT_INPUT_TRANSLATIONS = new InjectionToken('LuI18nInputTranslations', {
	factory: () => lui18nTextInputTranslations,
});

export interface LuI18nInputTranslations {
	clear: string;
	toggleMultilanguage: string;
	translateTo: string;
}

export const lui18nTextInputTranslations: ILuTranslation<LuI18nInputTranslations> = {
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
