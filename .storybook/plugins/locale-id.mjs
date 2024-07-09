import { LOCALE_ID } from '@angular/core';
import { applicationConfig } from '@storybook/angular';
import localeDe from '@angular/common/locales/de';
import localeEn from '@angular/common/locales/en';
import localeEs from '@angular/common/locales/es';
import localeFr from '@angular/common/locales/fr';
import localeIt from '@angular/common/locales/it';
import localeNl from '@angular/common/locales/nl';
import localePt from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';

[localeDe, localeEn, localeEs, localeFr, localeIt, localeNl, localePt].forEach((locale) => registerLocaleData(locale));

const availableLanguages = ['en', 'de', 'en-US', 'es', 'fr', 'it', 'nl', 'nl-BE', 'pt'];

export default {
	init() {
		[localeDe, localeEn, localeEs, localeFr, localeIt, localeNl, localePt].forEach((locale) => registerLocaleData(locale));
	},
	decorator: applicationConfig({
		providers: [
			{
				provide: LOCALE_ID,
				useFactory: () =>
					navigator.languages.find((lang) => availableLanguages.includes(lang)) ||
					navigator.languages.find((lang) => availableLanguages.includes(lang.split('-')[0])) ||
					availableLanguages[0],
			},
		],
	}),
};
