import { Inject, Injectable, LOCALE_ID } from '@angular/core';
import { ALuIntl, ILuTranslation } from '@lucca-front/ng/core';
import { LU_USER_SEARCHER_TRANSLATIONS } from './user-searcher.token';
import { ILuUserSearcherLabel } from './user-searcher.translate';

@Injectable()
export class LuUserSearcherIntl extends ALuIntl<ILuUserSearcherLabel> {
	constructor(
		@Inject(LU_USER_SEARCHER_TRANSLATIONS)
		translations: ILuTranslation<ILuUserSearcherLabel>,
		@Inject(LOCALE_ID) locale: string,
	) {
		super(translations, locale);
	}
}
