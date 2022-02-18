import { Inject, Injectable, LOCALE_ID } from '@angular/core';
import { ALuIntl, ILuTranslation } from '@lucca-front/ng/core';
import { LU_USER_SELECT_INPUT_TRANSLATIONS } from './user-select-input.token';
import { ILuUserSelectInputLabel } from './user-select-input.translate';

@Injectable()
export class LuUserSelectInputIntl extends ALuIntl<ILuUserSelectInputLabel> {
	constructor(
		@Inject(LU_USER_SELECT_INPUT_TRANSLATIONS)
		translations: ILuTranslation<ILuUserSelectInputLabel>,
		@Inject(LOCALE_ID) locale: string,
	) {
		super(translations, locale);
	}
}
