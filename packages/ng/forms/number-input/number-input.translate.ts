import { InjectionToken } from '@angular/core';
import { ILuTranslation } from '@lucca-front/ng/core';

export const LU_NUMBERFIELD_TRANSLATIONS = new InjectionToken('LuNumberFieldTranslations', {
	factory: () => luNumberFieldTranslations,
});

export interface LuNumberFieldLabel {
	clear: string;
}

export const luNumberFieldTranslations: ILuTranslation<LuNumberFieldLabel> = {
	en: {
		clear: 'Empty this field',
	},
	fr: {
		clear: 'Vider ce champ',
	},
};
