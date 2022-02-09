import { ILuTranslation } from '@lucca-front/ng/core';

export interface ILuUserSearcherLabel {
	includeFormerEmployees: string;
}
export abstract class ALuUserSearcherLabel {
	includeFormerEmployees: string;
}

export const luUserSearcherTranslations: ILuTranslation<ILuUserSearcherLabel> = {
	en: {
		includeFormerEmployees: 'Include former employees',
	},
	fr: {
		includeFormerEmployees: 'Inclure les salariés partis',
	},
	es: {
		includeFormerEmployees: 'Incluir a los antiguos empleados',
	},
};
