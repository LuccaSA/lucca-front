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
	selectAll: string;
}

export const luMultiSelectTranslations: ILuTranslation<ILuMultiSelectLabel> = {
	en: {
		placeholder: 'Select an option',
		clear: 'Clear selection',
		clearSearch: 'Clear search',
		emptyResults: 'No results',
		expand: 'Expand',
		reduce: 'Reduce',
		selectAll: 'Select all',
	},
	fr: {
		placeholder: 'Sélectionnez une option',
		clear: 'Vider la sélection',
		clearSearch: 'Vider la recherche',
		emptyResults: 'Aucun résultat pour votre recherche',
		expand: 'Étendre',
		reduce: 'Réduire',
		selectAll: 'Tout sélectionner',
	},
	de: {
		placeholder: 'Wählen Sie eine Option',
		clear: 'Auswahl löschen',
		clearSearch: 'Suche löschen',
		emptyResults: 'Keine Ergebnisse für Ihre Suche',
		expand: 'Erweitern',
		reduce: 'Reduzieren',
		selectAll: 'Alles auswählen',
	},
	es: {
		placeholder: 'Seleccione una opción',
		clear: 'Borrar selección',
		clearSearch: 'Borrar búsqueda',
		emptyResults: 'No hay resultados para su búsqueda',
		expand: 'Expandir',
		reduce: 'Reducir',
		selectAll: 'Seleccionar todo',
	},
	pt: {
		placeholder: 'Selecione uma opção',
		clear: 'Limpar seleção',
		clearSearch: 'Limpar pesquisa',
		emptyResults: 'Nenhum resultado para sua pesquisa',
		expand: 'Expandir',
		reduce: 'Reduzir',
		selectAll: 'Selecionar tudo',
	},
};
