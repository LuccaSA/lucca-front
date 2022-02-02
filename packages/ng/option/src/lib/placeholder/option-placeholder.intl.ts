import { Inject, Injectable, LOCALE_ID } from '@angular/core';
import { ALuIntl, ILuTranslation } from '@lucca-front/ng/core';
import { LU_OPTION_PLACEHOLDER_TRANSLATIONS } from './option-placeholder.token';
import { ILuOptionPlaceholderLabel } from './option-placeholder.translate';

@Injectable()
export class LuOptionPlaceholderIntl extends ALuIntl<ILuOptionPlaceholderLabel> {
	constructor(
		@Inject(LU_OPTION_PLACEHOLDER_TRANSLATIONS)
		translations: ILuTranslation<ILuOptionPlaceholderLabel>,
		@Inject(LOCALE_ID) locale: string,
	) {
		super(translations, locale);
	}
}
