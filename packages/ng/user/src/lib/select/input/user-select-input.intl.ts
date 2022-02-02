import { Injectable, LOCALE_ID, Inject } from '@angular/core';
import { LU_USER_SELECT_INPUT_TRANSLATIONS } from './user-select-input.token';
import { ILuUserSelectInputLabel } from './user-select-input.translate';
import { ALuIntl } from '@lucca-front/ng/core';

@Injectable()
export class LuUserSelectInputIntl extends ALuIntl<ILuUserSelectInputLabel> {
	constructor(
		@Inject(LU_USER_SELECT_INPUT_TRANSLATIONS) translations,
		@Inject(LOCALE_ID) locale,
	) {
		super(translations, locale);
	}
}
