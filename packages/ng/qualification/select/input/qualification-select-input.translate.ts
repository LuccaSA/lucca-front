import { InjectionToken } from '@angular/core';
import { ILuTranslation } from '@lucca-front/ng/core';
import { Translations } from './translations';

export const LU_QUALIFICATION_SELECT_INPUT_TRANSLATIONS = new InjectionToken('LuQualificationSelectTranslations', {
	factory: () => luQualificationSelectInputTranslations,
});

export interface ILuQualificationSelectInputLabel {
	qualifications: string;
}

export const luQualificationSelectInputTranslations: ILuTranslation<ILuQualificationSelectInputLabel> = Translations;
