import { Injectable, LOCALE_ID, Inject } from '@angular/core';
import { LOL_TRANSLATIONS_TOKEN } from './lol.translate';

@Injectable()
export class LolIntl {
	lol;
	constructor(@Inject(LOL_TRANSLATIONS_TOKEN) translations, @Inject(LOCALE_ID) locale) {
		const fallback = translations['en'] || {};
		const current = translations[locale] || translations[locale.substring(0, 2)] || {};

		const all = { ...fallback, ...current };
		Object.keys(all).forEach(k => {
			Object.defineProperty(this, k, {
				get: () => all[k],
			});
		});
	}
}
