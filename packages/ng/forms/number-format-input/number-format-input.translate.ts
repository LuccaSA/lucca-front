import { InjectionToken } from '@angular/core';
import { ILuTranslation } from '@lucca-front/ng/core';

export const LU_NUMBERFORMATFIELD_TRANSLATIONS = new InjectionToken('LuNumberFormatFieldTranslations', {
	factory: () => luNumberFormatFieldTranslations,
});

export interface LuNumberFormatFieldLabel {
	clear: string;
}

export const luNumberFormatFieldTranslations: ILuTranslation<LuNumberFormatFieldLabel> = {
	en: {
		clear: 'Empty this field',
	},
	fr: {
		clear: 'Vider ce champ',
	},
};
