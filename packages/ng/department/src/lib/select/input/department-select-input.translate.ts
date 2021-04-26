import { ILuTranslation } from '@lucca-front/ng/core';

export interface ILuDepartmentSelectInputLabel {
	departments: string;
}
export abstract class ALuDepartmentSelectInputLabel {
	departments: string;
}

export const luDepartmentSelectInputTranslations = {
	en: {
		departments: 'departments',
	},
	fr: {
		departments: 'départements',
	},
} as ILuTranslation<ILuDepartmentSelectInputLabel>;
