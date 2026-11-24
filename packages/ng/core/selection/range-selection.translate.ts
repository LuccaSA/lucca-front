import { InjectionToken } from '@angular/core';
import { LuPluralForms, LuTranslation } from '../translate/translation.model';
import { Translations } from './translations';

export const LU_RANGE_SELECTION_TRANSLATIONS = new InjectionToken('LuRangeSelectionTranslations', {
	factory: () => luRangeSelectionTranslations,
});

export interface LuRangeSelectionTranslations {
	rangeSelected: LuPluralForms;
	rangeUnselected: LuPluralForms;
}

export const luRangeSelectionTranslations: LuTranslation<LuRangeSelectionTranslations> = Translations;
