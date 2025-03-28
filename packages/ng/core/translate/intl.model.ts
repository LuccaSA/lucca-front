import { inject, InjectionToken, InputOptionsWithTransform, LOCALE_ID } from '@angular/core';
import { ILuTranslation, LuTranslation } from './translation.model';

export function getIntl<T>(translationsToken: InjectionToken<LuTranslation<T>> | InjectionToken<ILuTranslation<T>>): T {
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

export function intlInputOptions<T>(token: InjectionToken<LuTranslation<T>>): [T, InputOptionsWithTransform<T, Partial<T>>] {
	const base = getIntl(token);
	return [
		base,
		{
			transform: (patch: Partial<T>): T => ({
				...base,
				...patch,
			}),
		},
	];
}
