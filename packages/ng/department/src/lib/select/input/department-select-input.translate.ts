import { ILuTranslation } from '@lucca-front/ng/core';

export interface ILuDepartmentSelectInputLabel {
	departments: string;
}
export abstract class ALuDepartmentSelectInputLabel {
	departments: string;
}

export const luDepartmentSelectInputTranslations: ILuTranslation<ILuDepartmentSelectInputLabel> = {
	en: {
		departments: 'departments',
	},
	fr: {
		departments: 'départements',
	},
	es: {
		departments: 'departamentos',
	},
};
