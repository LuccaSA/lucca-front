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

export function intlInputOptions<T1>(token1: InjectionToken<LuTranslation<T1>>): [T1, InputOptionsWithTransform<T1, Partial<T1>>];
export function intlInputOptions<T1, T2>(token1: InjectionToken<LuTranslation<T1>>, token2: InjectionToken<LuTranslation<T2>>): [T1 & T2, InputOptionsWithTransform<T1 & T2, Partial<T1 & T2>>];
export function intlInputOptions<T>(...tokens: InjectionToken<LuTranslation<T>>[]): [T, InputOptionsWithTransform<T, Partial<T>>] {
	const base = tokens.reduce((acc, token) => ({ ...acc, ...getIntl(token) }), {} as T);
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
