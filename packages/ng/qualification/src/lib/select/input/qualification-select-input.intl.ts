import { Inject, Injectable, LOCALE_ID } from '@angular/core';
import { ALuIntl, ILuTranslation } from '@lucca-front/ng/core';
import { LU_QUALIFICATION_SELECT_INPUT_TRANSLATIONS } from './qualification-select-input.token';
import { ILuQualificationSelectInputLabel } from './qualification-select-input.translate';

@Injectable()
export class LuQualificationSelectInputIntl extends ALuIntl<ILuQualificationSelectInputLabel> {
	constructor(@Inject(LU_QUALIFICATION_SELECT_INPUT_TRANSLATIONS) translations: ILuTranslation<ILuQualificationSelectInputLabel>, @Inject(LOCALE_ID) locale: string) {
		super(translations, locale);
	}
}
