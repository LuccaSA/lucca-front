import { Injectable, LOCALE_ID, Inject } from '@angular/core';
import { ALuIntl } from '@lucca-front/ng/core';
import { LU_QUALIFICATION_SELECT_INPUT_TRANSLATIONS } from './qualification-select-input.token';
import { ILuQualificationSelectInputLabel } from './qualification-select-input.translate';

@Injectable()
export class LuQualificationSelectInputIntl extends ALuIntl<ILuQualificationSelectInputLabel> {
	constructor(@Inject(LU_QUALIFICATION_SELECT_INPUT_TRANSLATIONS) translations, @Inject(LOCALE_ID) locale) {
		super(translations, locale);
	}
}
