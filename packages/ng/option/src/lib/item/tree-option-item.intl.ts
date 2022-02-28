import { Inject, Injectable, LOCALE_ID } from '@angular/core';
import { ALuIntl, ILuTranslation } from '@lucca-front/ng/core';
import { LU_TREE_OPTION_ITEM_TRANSLATIONS } from './tree-option-item.token';
import { ILuTreeOptionItemLabel } from './tree-option-item.translate';

@Injectable()
export class LuTreeOptionItemIntl extends ALuIntl<ILuTreeOptionItemLabel> {
	constructor(@Inject(LU_TREE_OPTION_ITEM_TRANSLATIONS) translations: ILuTranslation<ILuTreeOptionItemLabel>, @Inject(LOCALE_ID) locale: string) {
		super(translations, locale);
	}
}
