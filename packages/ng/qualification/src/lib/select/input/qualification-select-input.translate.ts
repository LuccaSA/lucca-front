import { ILuTranslation } from '@lucca-front/ng/core';

export interface ILuQualificationSelectInputLabel {
	qualifications: string;
}
export abstract class ALuQualificationSelectInputLabel {
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
