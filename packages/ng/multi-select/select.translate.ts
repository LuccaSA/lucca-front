import { InjectionToken } from '@angular/core';
import { ILuTranslation } from '@lucca-front/ng/core';

export const LU_MULTI_SELECT_TRANSLATIONS = new InjectionToken('LuMultiSelectTranslations', {
	factory: () => luMultiSelectTranslations,
});

export interface ILuMultiSelectLabel {
	placeholder: string;
	search: string;
	clear: string;
	clearSearch: string;
	emptyResults: string;
	emptySelection: string;
	expand: string;
	reduce: string;
	selectAll: string;
}

export const luMultiSelectTranslations: ILuTranslation<ILuMultiSelectLabel> = {
	en: {
		placeholder: 'Select an option',
		search: 'Search',
		clear: 'Clear selection',
		clearSearch: 'Clear search',
		emptyResults: 'No results',
		emptySelection: 'Select items in the left list to start',
		expand: 'Expand',
		reduce: 'Reduce',
		selectAll: 'Select all',
	},
	fr: {
		placeholder: 'Sélectionnez une option',
		search: 'Rechercher',
		clear: 'Vider la sélection',
		clearSearch: 'Vider la recherche',
		emptySelection: 'Sélectionnez les éléments dans la liste de gauche pour commencer',
		emptyResults: 'Aucun résultat pour votre recherche',
		expand: 'Étendre',
		reduce: 'Réduire',
		selectAll: 'Tout sélectionner',
	},
	de: {
		placeholder: 'Wählen Sie eine Option',
		search: 'Suche',
		clear: 'Auswahl löschen',
		clearSearch: 'Suche löschen',
		emptyResults: 'Keine Ergebnisse für Ihre Suche',
		emptySelection: 'Wählen Sie Elemente in der linken Liste aus, um zu beginnen',
		expand: 'Erweitern',
		reduce: 'Reduzieren',
		selectAll: 'Alles auswählen',
	},
	es: {
		placeholder: 'Seleccione una opción',
		search: 'Buscar',
		clear: 'Borrar selección',
		clearSearch: 'Borrar búsqueda',
		emptyResults: 'No hay resultados para su búsqueda',
		emptySelection: 'Seleccione elementos en la lista de la izquierda para comenzar',
		expand: 'Expandir',
		reduce: 'Reducir',
		selectAll: 'Seleccionar todo',
	},
	pt: {
		placeholder: 'Selecione uma opção',
		search: 'Pesquisar',
		clear: 'Limpar seleção',
		clearSearch: 'Limpar pesquisa',
		emptyResults: 'Nenhum resultado para sua pesquisa',
		emptySelection: 'Selecione itens na lista à esquerda para começar',
		expand: 'Expandir',
		reduce: 'Reduzir',
		selectAll: 'Selecionar tudo',
	},
};
