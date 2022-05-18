import { Inject, Injectable, LOCALE_ID } from '@angular/core';
import { ALuIntl, ILuTranslation } from '@lucca-front/ng/core';
import { ILuToastLabel } from './toasts.translate';
import { LU_TOAST_TRANSLATIONS } from './toasts.token';

@Injectable()
export class LuToastIntl extends ALuIntl<ILuToastLabel> {
	constructor(
		@Inject(LU_TOAST_TRANSLATIONS)
		translations: ILuTranslation<ILuToastLabel>,
		@Inject(LOCALE_ID) locale: string,
	) {
		super(translations, locale);
	}
}
