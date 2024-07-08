import { InjectionToken } from '@angular/core';
import { ILuTranslation } from '@lucca-front/ng/core';
import { Translations } from './translations';

export const LU_TEXTFIELD_TRANSLATIONS = new InjectionToken('LuTextfieldTranslations', {
	factory: () => luTextfieldTranslations,
});

export interface LuTextfieldLabel {
	clear: string;
	togglePasswordVisibility: string;
}

export const luTextfieldTranslations: ILuTranslation<LuTextfieldLabel> = Translations;
