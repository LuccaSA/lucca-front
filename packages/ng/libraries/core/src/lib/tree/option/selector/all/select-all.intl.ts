import { Injectable, LOCALE_ID, Inject } from '@angular/core';
import { ALuIntl } from '../../../../translate/index';
import { ILuTreeOptionSelectAllLabel } from './select-all.translate';
import { LU_TREE_OPTION_SELECT_ALL_TRANSLATIONS } from './select-all.token';

@Injectable()
export class LuTreeOptionSelectAllIntl extends ALuIntl<ILuTreeOptionSelectAllLabel> {
	constructor(@Inject(LU_TREE_OPTION_SELECT_ALL_TRANSLATIONS) translations, @Inject(LOCALE_ID) locale) {
		super(translations, locale);
	}
}
