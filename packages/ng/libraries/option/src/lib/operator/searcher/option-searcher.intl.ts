import { Injectable, LOCALE_ID, Inject } from '@angular/core';
import { ALuIntl } from '@lucca-front/ng/core';
import { ILuOptionSearcherLabel } from './option-searcher.translate';
import { LU_OPTION_SEARCHER_TRANSLATIONS } from './option-searcher.token';

@Injectable()
export class LuOptionSearcherIntl extends ALuIntl<ILuOptionSearcherLabel> {
	constructor(@Inject(LU_OPTION_SEARCHER_TRANSLATIONS) translations, @Inject(LOCALE_ID) locale) {
		super(translations, locale);
	}
}
