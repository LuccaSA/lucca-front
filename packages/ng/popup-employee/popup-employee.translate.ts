import { InjectionToken } from '@angular/core';
import { ILuTranslation } from '@lucca-front/ng/core';

export const LU_POPUP_EMPLOYEE_TRANSLATIONS = new InjectionToken('LuPopupEmployeeTranslations', {
	factory: () => luPopupEmployeeTranslations,
});

export interface LuPopupEmployeeTranslations {
	placeholder: string;
	clear: string;
	clearSearch: string;
	emptyResults: string;
	loading: string;
}

export const luPopupEmployeeTranslations: ILuTranslation<LuPopupEmployeeTranslations> = {
	en: {
		placeholder: 'Select an option',
		clear: 'Clear',
		clearSearch: 'Clear search',
		emptyResults: 'No results',
		loading: 'Loading...',
	},
	fr: {
		placeholder: 'Sélectionnez une option',
		clear: 'Effacer',
		clearSearch: 'Vider la recherche',
		emptyResults: 'Aucun résultat pour votre recherche',
		loading: 'Chargement en cours...',
	},
	de: {
		placeholder: 'Wählen Sie eine Option',
		clear: 'Löschen',
		clearSearch: 'Suche löschen',
		emptyResults: 'Keine Ergebnisse für Ihre Suche',
		loading: 'Wird geladen...',
	},
	es: {
		placeholder: 'Seleccione una opción',
		clear: 'Borrar',
		clearSearch: 'Borrar búsqueda',
		emptyResults: 'No hay resultados para su búsqueda',
		loading: 'Cargando...',
	},
	pt: {
		placeholder: 'Selecione uma opção',
		clear: 'Limpar',
		clearSearch: 'Limpar pesquisa',
		emptyResults: 'Nenhum resultado para sua pesquisa',
		loading: 'Carregando...',
	},
};
