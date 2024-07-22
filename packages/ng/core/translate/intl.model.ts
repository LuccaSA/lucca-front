import { inject, InjectionToken, LOCALE_ID } from '@angular/core';
import { LuTranslation } from './translation.model';

export function getIntl<T>(translationsToken: InjectionToken<LuTranslation<T>>): T {
	const locale = inject(LOCALE_ID);
	const translations = inject(translationsToken);

	if (locale in translations) {
		return translations[locale];
	}

	const shortLocale = locale.substring(0, 2);
	if (shortLocale in translations) {
		return translations[shortLocale];
	}

	return translations['en'] ?? translations['en-GB'] ?? translations['en-US'];
}
