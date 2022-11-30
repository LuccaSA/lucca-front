import { inject, InjectionToken, LOCALE_ID } from '@angular/core';
import { ILuTranslation } from './translation.model';

export type ILuIntl<T> = { [P in keyof T]: string };

export function getIntl<T>(translationsToken: InjectionToken<ILuTranslation<T>>): T {
	const locale = inject(LOCALE_ID);
	const translations = inject(translationsToken);

	return translations[locale] || translations[locale.substring(0, 2)] || translations['en'];
}
