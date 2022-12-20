import { InjectionToken } from '@angular/core';
import { ILuTranslation } from '@lucca-front/ng/core';

export const LU_QUALIFICATION_SELECT_INPUT_TRANSLATIONS = new InjectionToken('LuQualificationSelectTranslations', {
	factory: () => luQualificationSelectInputTranslations,
});

export interface ILuQualificationSelectInputLabel {
	qualifications: string;
}

export const luQualificationSelectInputTranslations: ILuTranslation<ILuQualificationSelectInputLabel> = {
	en: {
		qualifications: 'qualifications',
	},
	fr: {
		qualifications: 'qualifications',
	},
	es: {
		qualifications: 'calificaciones',
	},
};
