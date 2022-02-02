import { ILuTranslation } from '@lucca-front/ng/core';

export interface ILuQualificationSelectInputLabel {
	qualifications: string;
}
export abstract class ALuQualificationSelectInputLabel {
	qualifications: string;
}

export const luQualificationSelectInputTranslations = {
	en: {
		qualifications: 'qualifications',
	},
	fr: {
		qualifications: 'qualifications',
	},
	es: {
		qualifications: 'calificaciones',
	},
} as ILuTranslation<ILuQualificationSelectInputLabel>;
