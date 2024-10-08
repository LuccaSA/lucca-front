import { InjectionToken } from '@angular/core';
import { LuTranslation } from '@lucca-front/ng/core';
import { Translations } from './translations';

export const LU_SIMPLE_SELECT_TRANSLATIONS = new InjectionToken('LuSimpleSelectTranslations', {
	factory: () => luSimpleSelectTranslations,
});

export interface ILuSimpleSelectLabel {
	placeholder: string;
	clear: string;
	clearSearch: string;
	emptyResults: string;
	loading: string;
}

export const luSimpleSelectTranslations: LuTranslation<ILuSimpleSelectLabel> = Translations;
