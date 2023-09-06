import { InjectionToken } from '@angular/core';
import { ILuTranslation } from '@lucca-front/ng/core';

export const LU_MULTI_SELECT_DISPLAYER_TRANSLATIONS = new InjectionToken('LuMultiSelectDisplayerTranslations', {
	factory: () => luMultiSelectDisplayerTranslations,
});

export interface ILuMultiSelectDisplayerLabel {
	otherResult: string;
	otherResults: string;
	showResultsDetails: string;
}

export const luMultiSelectDisplayerTranslations: ILuTranslation<ILuMultiSelectDisplayerLabel> = {
	fr: {
		otherResult: 'autre résultat',
		otherResults: 'autres résultats',
		showResultsDetails: 'Voir le détail',
	},
	en: {
		otherResult: 'other result',
		otherResults: 'other results',
		showResultsDetails: 'Show details',
	},
	de: {
		otherResult: 'anderes Ergebnis',
		otherResults: 'andere Ergebnisse',
		showResultsDetails: 'Details anzeigen',
	},
	es: {
		otherResult: 'otro resultado',
		otherResults: 'otros resultados',
		showResultsDetails: 'Mostrar detalles',
	},
	pt: {
		otherResult: 'outro resultado',
		otherResults: 'outros resultados',
		showResultsDetails: 'Mostrar detalhes',
	},
};
