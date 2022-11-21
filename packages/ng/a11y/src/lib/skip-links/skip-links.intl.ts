import { Inject, Injectable, LOCALE_ID } from '@angular/core';
import { ALuIntl, ILuTranslation } from '@lucca-front/ng/core';
import { LU_SKIP_LINKS_TRANSLATIONS } from './skip-links.token';
import { ILuSkipLinksLabel } from './skip-links.translate';

@Injectable({ providedIn: 'root' })
export class LuSkipLinksIntl extends ALuIntl<ILuSkipLinksLabel> {
	constructor(@Inject(LU_SKIP_LINKS_TRANSLATIONS) translations: ILuTranslation<ILuSkipLinksLabel>, @Inject(LOCALE_ID) locale: string) {
		super(translations, locale);
	}
}
