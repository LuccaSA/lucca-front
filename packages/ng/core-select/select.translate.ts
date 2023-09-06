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
}

export const luMultiSelectTranslations: ILuTranslation<ILuMultiSelectLabel> = {
	en: {
		placeholder: 'Select an option',
		clear: 'Clear',
		clearSearch: 'Clear search',
		emptyResults: 'No results',
	},
	fr: {
		placeholder: 'Sélectionnez une option',
		clear: 'Effacer',
		clearSearch: 'Vider la recherche',
		emptyResults: 'Aucun résultat pour votre recherche',
	},
	de: {
		placeholder: 'Wählen Sie eine Option',
		clear: 'Löschen',
		clearSearch: 'Suche löschen',
		emptyResults: 'Keine Ergebnisse für Ihre Suche',
	},
	es: {
		placeholder: 'Seleccione una opción',
		clear: 'Borrar',
		clearSearch: 'Borrar búsqueda',
		emptyResults: 'No hay resultados para su búsqueda',
	},
	pt: {
		placeholder: 'Selecione uma opção',
		clear: 'Limpar',
		clearSearch: 'Limpar pesquisa',
		emptyResults: 'Nenhum resultado para sua pesquisa',
	},
};
