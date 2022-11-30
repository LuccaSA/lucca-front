import { InjectionToken } from '@angular/core';
import { ILuTranslation } from '@lucca-front/ng/core';

export const LU_TREE_OPTION_ITEM_TRANSLATIONS = new InjectionToken('LuTreeOptionItemTranslations', {
	factory: () => luTreeOptionItemTranslations,
});

export interface ILuTreeOptionItemLabel {
	parentOnly: string;
	childrenOnly: string;
}

export const luTreeOptionItemTranslations: ILuTranslation<ILuTreeOptionItemLabel> = {
	en: {
		parentOnly: 'Parent only',
		childrenOnly: 'Children only',
	},
	fr: {
		parentOnly: 'Seulement le parent',
		childrenOnly: 'Seulement les enfants',
	},
};
