import { InjectionToken } from '@angular/core';
import { ILuTranslation } from '@lucca-front/ng/core';

export const LU_OPTION_PLACEHOLDER_TRANSLATIONS = new InjectionToken('LuOptionPlaceholderTranslations', {
	factory: () => luOptionPlaceholderTranslations,
});

export interface ILuOptionPlaceholderLabel {
	placeholderDescription: string;
	placeholderAction: string;
}

export const luOptionPlaceholderTranslations: ILuTranslation<ILuOptionPlaceholderLabel> = {
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
};
