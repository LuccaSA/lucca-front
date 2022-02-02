import { Injectable, LOCALE_ID, Inject } from '@angular/core';
import { LU_MODAL_TRANSLATIONS } from './modal.token';
import { ILuModalLabel } from './modal.translate';
import { ALuIntl } from '@lucca-front/ng/core';

@Injectable()
export class LuModalIntl extends ALuIntl<ILuModalLabel> {
	constructor(
		@Inject(LU_MODAL_TRANSLATIONS) translations,
		@Inject(LOCALE_ID) locale,
	) {
		super(translations, locale);
	}
}
