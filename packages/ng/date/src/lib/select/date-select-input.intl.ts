import { Inject, Injectable, LOCALE_ID } from '@angular/core';
import { ALuIntl, ILuTranslation } from '@lucca-front/ng/core';
import { LU_DATE_SELECT_INPUT_TRANSLATIONS } from './date-select-input.token';
import { ILuDateSelectInputLabel } from './date-select-input.translate';

@Injectable()
export class LuDateSelectInputIntl extends ALuIntl<ILuDateSelectInputLabel> {
	constructor(@Inject(LU_DATE_SELECT_INPUT_TRANSLATIONS) translations: ILuTranslation<ILuDateSelectInputLabel>, @Inject(LOCALE_ID) locale: string) {
		super(translations, locale);
	}
}
