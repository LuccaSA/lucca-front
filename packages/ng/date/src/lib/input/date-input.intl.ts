import { Inject, Injectable, LOCALE_ID } from '@angular/core';
import { ALuIntl, ILuTranslation } from '@lucca-front/ng/core';
import { LU_DATE_INPUT_TRANSLATIONS } from './date-input.token';
import { ILuDateInputLabel } from './date-input.translate';

@Injectable()
export class LuDateInputIntl extends ALuIntl<ILuDateInputLabel> {
	constructor(@Inject(LU_DATE_INPUT_TRANSLATIONS) translations: ILuTranslation<ILuDateInputLabel>, @Inject(LOCALE_ID) locale: string) {
		super(translations, locale);
	}
}
