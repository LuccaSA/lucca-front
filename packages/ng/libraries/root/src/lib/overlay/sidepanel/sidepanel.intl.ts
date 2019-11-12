import { Injectable, LOCALE_ID, Inject } from '@angular/core';
import { ALuIntl } from '../../translate/index';
import { ILuSidepanelLabel } from './sidepanel.translate';
import { LU_SIDEPANEL_TRANSLATIONS } from './sidepanel.token';

@Injectable()
export class LuSidepanelIntl extends ALuIntl<ILuSidepanelLabel> {
	constructor(@Inject(LU_SIDEPANEL_TRANSLATIONS) translations, @Inject(LOCALE_ID) locale) {
		super(translations, locale);
	}
}
