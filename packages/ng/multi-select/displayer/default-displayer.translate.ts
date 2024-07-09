import { InjectionToken } from '@angular/core';
import { LuTranslation } from '@lucca-front/ng/core';
import { Translations } from './translations';

export const LU_MULTI_SELECT_DISPLAYER_TRANSLATIONS = new InjectionToken('LuMultiSelectDisplayerTranslations', {
	factory: () => luMultiSelectDisplayerTranslations,
});

export interface ILuMultiSelectDisplayerLabel {
	otherResult: string;
	otherResults: string;
	showResultsDetails: string;
	removeOption: string;
}

export const luMultiSelectDisplayerTranslations: LuTranslation<ILuMultiSelectDisplayerLabel> = Translations;
