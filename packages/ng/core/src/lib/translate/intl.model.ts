import { ILuTranslation } from './translation.model';

export type ILuIntl<T> = { [P in keyof T]: string };

export abstract class ALuIntl<T> {
	constructor(translations: ILuTranslation<T>, locale: string) {
		const fallback = translations['en'] || {};
		const current =
			translations[locale] || translations[locale.substring(0, 2)] || {};

		const all = { ...fallback, ...current };
		Object.keys(all).forEach((k) => {
			Object.defineProperty(this, k, {
				get: () => all[k],
			});
		});
	}
}
