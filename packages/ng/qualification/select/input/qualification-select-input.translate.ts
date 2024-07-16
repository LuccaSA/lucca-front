import { InjectionToken } from '@angular/core';
import { LuTranslation } from '@lucca-front/ng/core';
import { Translations } from './translations';

export const LU_QUALIFICATION_SELECT_INPUT_TRANSLATIONS = new InjectionToken('LuQualificationSelectTranslations', {
	factory: () => luQualificationSelectInputTranslations,
});

export interface ILuQualificationSelectInputLabel {
	qualifications: string;
}

export const luQualificationSelectInputTranslations: LuTranslation<ILuQualificationSelectInputLabel> = Translations;
