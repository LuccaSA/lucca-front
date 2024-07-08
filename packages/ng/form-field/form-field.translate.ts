import { InjectionToken } from '@angular/core';
import { ILuTranslation } from '@lucca-front/ng/core';
import { Translations } from './translations';

export const LU_FORM_FIELD_TRANSLATIONS = new InjectionToken('LuFormFieldTranslations', {
	factory: () => luFormFieldTranslations,
});

export interface LuFormFieldTranslations {
	counter: string;
}

export const luFormFieldTranslations: ILuTranslation<LuFormFieldTranslations> = Translations;
