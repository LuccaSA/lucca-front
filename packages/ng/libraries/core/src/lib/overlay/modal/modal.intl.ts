import { Injectable, LOCALE_ID, Inject } from '@angular/core';
import { LU_MODAL_TRANSLATIONS } from './modal.token';

@Injectable()
export class LuModalIntl {
	constructor(@Inject(LU_MODAL_TRANSLATIONS) translations, @Inject(LOCALE_ID) locale) {
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
