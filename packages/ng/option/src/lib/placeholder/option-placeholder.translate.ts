import { ILuTranslation } from '@lucca-front/ng/core';

export interface ILuOptionPlaceholderLabel {
	placeholderDescription: string;
	placeholderAction: string;
}
export abstract class ALuOptionPlaceholderLabel implements ILuOptionPlaceholderLabel {
	placeholderDescription: string;
	placeholderAction: string;
}

export const luOptionPlaceholderTranslations = {
	en: {
		placeholderDescription: 'No results match your search criteria.',
		placeholderAction: 'Clear search',
	},
	fr: {
		placeholderDescription: 'Aucun résultat pour votre recherche',
		placeholderAction: 'Vider la recherche',
	},
	es: {
		placeholderDescription: 'No se han encontrado resultados para su búsqueda',
		placeholderAction: 'Eliminar búsqueda',
	},
} as ILuTranslation<ILuOptionPlaceholderLabel>;
