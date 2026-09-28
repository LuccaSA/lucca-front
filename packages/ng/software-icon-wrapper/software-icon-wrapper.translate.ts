import { InjectionToken } from '@angular/core';
import { LuPluralForms, LuTranslation } from '@lucca-front/ng/core';
import { Translations } from './translations';

export const LU_SOFTWARE_ICON_WRAPPER_TRANSLATIONS = new InjectionToken('LuSoftwareIconWrapperTranslations', {
	factory: () => luSoftwareIconWrapperTranslations,
});

export type SoftwareIconWrapperTranslations = {
	seeMore: string | LuPluralForms;
};

export const luSoftwareIconWrapperTranslations: LuTranslation<SoftwareIconWrapperTranslations> = Translations;
