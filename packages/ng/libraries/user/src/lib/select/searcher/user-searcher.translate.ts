import { ILuTranslation } from '@lucca-front/ng/core';

export interface ILuUserSearcherLabel {
	includeFormerEmployees: string;
}
export abstract class ALuUserSearcherLabel {
	includeFormerEmployees: string;
}

export const luUserSearcherTranslations = {
	en: {
		includeFormerEmployees: 'Include former employees',
	},
	fr: {
		includeFormerEmployees: 'Inclure les salariés partis',
	},
} as ILuTranslation<ILuUserSearcherLabel>;
