import { InjectionToken } from '@angular/core';

export const lolTranslations = {
	en: {
		lol: 'lol',
	},
	fr: {
		lol: 'mdr',
	},
	de : {
		lol: 'laut lachen',
	}
};
export const LOL_TRANSLATIONS_TOKEN = new InjectionToken('lol translations');
