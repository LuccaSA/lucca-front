import { ILuTranslation } from '@lucca-front/ng/core';

export interface ILuOptionSearcherLabel {
	emptyDescription: string;
	emptyAction: string;
}
export abstract class ALuOptionSearcherLabel implements ILuOptionSearcherLabel {
	emptyDescription: string;
	emptyAction: string;
}

export const luOptionSearcherTranslations = {
	en: {
		emptyDescription: 'No results match your search criteria.',
		emptyAction: 'Clear search',
	},
	fr: {
		emptyDescription: 'Aucun résultat pour votre recherche',
		emptyAction: 'Vider la recherche',
	},
} as ILuTranslation<ILuOptionSearcherLabel>;
