import { Inject, Injectable, LOCALE_ID } from '@angular/core';
import { ALuIntl, ILuTranslation } from '@lucca-front/ng/core';
import { LU_MODAL_TRANSLATIONS } from './modal.token';
import { ILuModalLabel } from './modal.translate';

@Injectable()
export class LuModalIntl extends ALuIntl<ILuModalLabel> {
	constructor(@Inject(LU_MODAL_TRANSLATIONS) translations: ILuTranslation<ILuModalLabel>, @Inject(LOCALE_ID) locale: string) {
		super(translations, locale);
	}
}
