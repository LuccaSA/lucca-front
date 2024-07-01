import { InjectionToken } from '@angular/core';
import { ILuTranslation } from '@lucca-front/ng/core';

export const LU_TEXTFIELD_TRANSLATIONS = new InjectionToken('LuTextfieldTranslations', {
	factory: () => luTextfieldTranslations,
});

export interface LuTextfieldLabel {
	clear: string;
	togglePasswordVisibility: string;
	toggleMultilanguage: string;
	'translateToen-EN': string;
	'translateToes-ES': string;
	'translateTode-DE': string;
	'translateTofr-FR': string;
}

export const luTextfieldTranslations: ILuTranslation<LuTextfieldLabel> = {
	en: {
		clear: 'Empty this field',
		togglePasswordVisibility: 'Show password',
		toggleMultilanguage: 'Show translations',
		'translateToen-EN': 'Translate to english',
		'translateToes-ES': 'Translate to spanish',
		'translateTode-DE': 'Translate to german',
		'translateTofr-FR': 'Translate to french',
	},
	fr: {
		clear: 'Vider ce champ',
		togglePasswordVisibility: 'Afficher le mot de passe',
		toggleMultilanguage: 'Afficher les traductions',
		'translateToen-EN': 'Traduire en français',
		'translateToes-ES': 'Traduire en espagnol',
		'translateTode-DE': 'Traduire en allemand',
		'translateTofr-FR': 'Traduire en français',
	},
};
