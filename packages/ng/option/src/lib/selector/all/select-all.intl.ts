import { Inject, Injectable, LOCALE_ID } from '@angular/core';
import { ALuIntl, ILuTranslation } from '@lucca-front/ng/core';
import { LU_OPTION_SELECT_ALL_TRANSLATIONS } from './select-all.token';
import { ILuOptionSelectAllLabel } from './select-all.translate';

@Injectable()
export class LuOptionSelectAllIntl extends ALuIntl<ILuOptionSelectAllLabel> {
	constructor(
		@Inject(LU_OPTION_SELECT_ALL_TRANSLATIONS)
		translations: ILuTranslation<ILuOptionSelectAllLabel>,
		@Inject(LOCALE_ID) locale: string,
	) {
		super(translations, locale);
	}
}
