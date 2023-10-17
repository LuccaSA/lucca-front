import { InjectionToken } from '@angular/core';
import { ILuTranslation } from '@lucca-front/ng/core';

export const LU_TEXTFIELD_TRANSLATIONS = new InjectionToken('LuTextfieldTranslations', {
	factory: () => luTextfieldTranslations,
});

export interface LuTextfieldLabel {
	clear: string;
}

export const luTextfieldTranslations: ILuTranslation<LuTextfieldLabel> = {
	en: {
		clear: 'Empty this field',
	},
	fr: {
		clear: 'Vider ce champ',
	},
};
