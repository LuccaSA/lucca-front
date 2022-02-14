import { Inject, Injectable, LOCALE_ID } from '@angular/core';
import { ALuIntl, ILuTranslation } from '@lucca-front/ng/core';
import { LU_ESTABLISHMENT_SELECT_INPUT_TRANSLATIONS } from './establishment-select-input.token';
import { ILuEstablishmentSelectInputLabel } from './establishment-select-input.translate';

@Injectable()
export class LuEstablishmentSelectInputIntl extends ALuIntl<ILuEstablishmentSelectInputLabel> {
	constructor(
		@Inject(LU_ESTABLISHMENT_SELECT_INPUT_TRANSLATIONS)
		translations: ILuTranslation<ILuEstablishmentSelectInputLabel>,
		@Inject(LOCALE_ID) locale: string,
	) {
		super(translations, locale);
	}
}
