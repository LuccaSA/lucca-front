import { Injectable, LOCALE_ID, Inject } from '@angular/core';
import { LU_DATE_SELECT_INPUT_TRANSLATIONS } from './date-select-input.token';
import { ILuDateSelectInputLabel } from './date-select-input.translate';
import { ALuIntl } from '@lucca-front/ng/core';

@Injectable()
export class LuDateSelectInputIntl extends ALuIntl<ILuDateSelectInputLabel> {
	constructor(
		@Inject(LU_DATE_SELECT_INPUT_TRANSLATIONS) translations,
		@Inject(LOCALE_ID) locale,
	) {
		super(translations, locale);
	}
}
