import { inject, InjectionToken, LOCALE_ID } from '@angular/core';
import { ILuTranslation } from './translation.model';

export type ILuIntl<T> = { [P in keyof T]: string };

function isSupportedLang<T>(locale: string, translations: ILuTranslation<T>): locale is keyof ILuTranslation<T> {
	return locale in translations;
}

export function getIntl<T>(translationsToken: InjectionToken<ILuTranslation<T>>): T {
	const locale = inject(LOCALE_ID);
	const translations = inject(translationsToken);

	if (isSupportedLang(locale, translations)) {
		return translations[locale];
	}

	const shortLocale = locale.substring(0, 2);
	if (isSupportedLang(shortLocale, translations)) {
		return translations[shortLocale];
	}

	return translations['en'];
}
