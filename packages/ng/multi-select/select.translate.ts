import { InjectionToken } from '@angular/core';
import { ILuTranslation } from '@lucca-front/ng/core';
import { Translations } from './translations';

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
	unselectAll: string;
	loading: string;
}

export const luMultiSelectTranslations: ILuTranslation<ILuMultiSelectLabel> = Translations;
