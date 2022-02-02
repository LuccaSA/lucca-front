import { Injectable, LOCALE_ID, Inject } from '@angular/core';
import { ALuIntl } from '@lucca-front/ng/core';
import { ILuOptionPlaceholderLabel } from './option-placeholder.translate';
import { LU_OPTION_PLACEHOLDER_TRANSLATIONS } from './option-placeholder.token';

@Injectable()
export class LuOptionPlaceholderIntl extends ALuIntl<ILuOptionPlaceholderLabel> {
	constructor(
		@Inject(LU_OPTION_PLACEHOLDER_TRANSLATIONS) translations,
		@Inject(LOCALE_ID) locale,
	) {
		super(translations, locale);
	}
}
