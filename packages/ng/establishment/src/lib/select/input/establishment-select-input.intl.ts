import { Injectable, LOCALE_ID, Inject } from '@angular/core';
import { ALuIntl } from '@lucca-front/ng/core';
import { LU_ESTABLISHMENT_SELECT_INPUT_TRANSLATIONS } from './establishment-select-input.token';
import { ILuEstablishmentSelectInputLabel } from './establishment-select-input.translate';

@Injectable()
export class LuEstablishmentSelectInputIntl extends ALuIntl<ILuEstablishmentSelectInputLabel> {
	constructor(
		@Inject(LU_ESTABLISHMENT_SELECT_INPUT_TRANSLATIONS) translations,
		@Inject(LOCALE_ID) locale,
	) {
		super(translations, locale);
	}
}
