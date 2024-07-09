import { InjectionToken } from '@angular/core';
import { LuTranslation } from '@lucca-front/ng/core';
import { Translations } from './translations';

export const LU_DATE_INPUT_TRANSLATIONS = new InjectionToken('LuDateInputtranslations', {
	factory: () => luDateInputTranslations,
});

export interface ILuDateInputLabel {
	placeholderDay: string;
	placeholderMonth: string;
	placeholderYear: string;
	formatDay: string;
	formatMonth: string;
	formatYear: string;
}

export const luDateInputTranslations: LuTranslation<ILuDateInputLabel> = Translations;
