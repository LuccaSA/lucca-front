import { InjectionToken } from '@angular/core';
import { ILuTranslation } from '@lucca-front/ng/core';
import { Translations } from './translations';

export const LU_TREE_OPTION_ITEM_TRANSLATIONS = new InjectionToken('LuTreeOptionItemTranslations', {
	factory: () => luTreeOptionItemTranslations,
});

export interface ILuTreeOptionItemLabel {
	parentOnly: string;
	childrenOnly: string;
}

export const luTreeOptionItemTranslations: ILuTranslation<ILuTreeOptionItemLabel> = Translations;
