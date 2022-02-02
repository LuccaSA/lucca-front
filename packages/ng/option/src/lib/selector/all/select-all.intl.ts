import { Injectable, LOCALE_ID, Inject } from '@angular/core';
import { ALuIntl } from '@lucca-front/ng/core';
import { ILuOptionSelectAllLabel } from './select-all.translate';
import { LU_OPTION_SELECT_ALL_TRANSLATIONS } from './select-all.token';

@Injectable()
export class LuOptionSelectAllIntl extends ALuIntl<ILuOptionSelectAllLabel> {
	constructor(
		@Inject(LU_OPTION_SELECT_ALL_TRANSLATIONS) translations,
		@Inject(LOCALE_ID) locale,
	) {
		super(translations, locale);
	}
}
