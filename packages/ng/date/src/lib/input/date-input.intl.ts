import { Injectable, LOCALE_ID, Inject } from '@angular/core';
import { LU_DATE_INPUT_TRANSLATIONS } from './date-input.token';
import { ILuDateInputLabel } from './date-input.translate';
import { ALuIntl } from '@lucca-front/ng/core';

@Injectable()
export class LuDateInputIntl extends ALuIntl<ILuDateInputLabel> {
	constructor(@Inject(LU_DATE_INPUT_TRANSLATIONS) translations, @Inject(LOCALE_ID) locale) {
		super(translations, locale);
	}
}
