import { Injectable, LOCALE_ID, Inject } from '@angular/core';
import { ALuIntl } from '@lucca-front/ng/core';
import { ILuUserSearcherLabel } from './user-searcher.translate';
import { LU_USER_SEARCHER_TRANSLATIONS } from './user-searcher.token';

@Injectable()
export class LuUserSearcherIntl extends ALuIntl<ILuUserSearcherLabel> {
	constructor(
		@Inject(LU_USER_SEARCHER_TRANSLATIONS) translations,
		@Inject(LOCALE_ID) locale,
	) {
		super(translations, locale);
	}
}
