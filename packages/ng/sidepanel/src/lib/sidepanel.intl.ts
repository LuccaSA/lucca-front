import { Inject, Injectable, LOCALE_ID } from '@angular/core';
import { ALuIntl, ILuTranslation } from '@lucca-front/ng/core';
import { LU_SIDEPANEL_TRANSLATIONS } from './sidepanel.token';
import { ILuSidepanelLabel } from './sidepanel.translate';

@Injectable()
export class LuSidepanelIntl extends ALuIntl<ILuSidepanelLabel> {
	constructor(@Inject(LU_SIDEPANEL_TRANSLATIONS) translations: ILuTranslation<ILuSidepanelLabel>, @Inject(LOCALE_ID) locale: string) {
		super(translations, locale);
	}
}
