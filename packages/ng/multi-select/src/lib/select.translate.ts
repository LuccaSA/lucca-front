import { InjectionToken } from '@angular/core';
import { ILuTranslation } from '@lucca-front/ng/core';

export const LU_MULTI_SELECT_TRANSLATIONS = new InjectionToken('LuMultiSelectTranslations', {
	factory: () => luMultiSelectTranslations,
});

export interface ILuMultiSelectLabel {
	placeholder: string;
	clear: string;
	clearSearch: string;
	emptyResults: string;
	expand: string;
	reduce: string;
}

export const luMultiSelectTranslations: ILuTranslation<ILuMultiSelectLabel> = {
	en: {
		placeholder: 'Select an option',
		clear: 'Clear selection',
		clearSearch: 'Clear search',
		emptyResults: 'No results',
		expand: 'Expand',
		reduce: 'Reduce',
	},
	fr: {
		placeholder: 'Sélectionnez une option',
		clear: 'Vider la sélection',
		clearSearch: 'Vider la recherche',
		emptyResults: 'Aucun résultat pour votre recherche',
		expand: 'Étendre',
		reduce: 'Réduire',
	},
	de: {
		placeholder: 'Wählen Sie eine Option',
		clear: 'Auswahl löschen',
		clearSearch: 'Suche löschen',
		emptyResults: 'Keine Ergebnisse für Ihre Suche',
		expand: 'Erweitern',
		reduce: 'Reduzieren',
	},
	es: {
		placeholder: 'Seleccione una opción',
		clear: 'Borrar selección',
		clearSearch: 'Borrar búsqueda',
		emptyResults: 'No hay resultados para su búsqueda',
		expand: 'Expandir',
		reduce: 'Reducir',
	},
	pt: {
		placeholder: 'Selecione uma opção',
		clear: 'Limpar seleção',
		clearSearch: 'Limpar pesquisa',
		emptyResults: 'Nenhum resultado para sua pesquisa',
		expand: 'Expandir',
		reduce: 'Reduzir',
	},
};
