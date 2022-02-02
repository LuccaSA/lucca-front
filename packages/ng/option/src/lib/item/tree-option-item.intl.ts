import { Injectable, LOCALE_ID, Inject } from '@angular/core';
import { LU_TREE_OPTION_ITEM_TRANSLATIONS } from './tree-option-item.token';
import { ILuTreeOptionItemLabel } from './tree-option-item.translate';
import { ALuIntl } from '@lucca-front/ng/core';

@Injectable()
export class LuTreeOptionItemIntl extends ALuIntl<ILuTreeOptionItemLabel> {
	constructor(
		@Inject(LU_TREE_OPTION_ITEM_TRANSLATIONS) translations,
		@Inject(LOCALE_ID) locale,
	) {
		super(translations, locale);
	}
}
