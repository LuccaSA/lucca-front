import { InjectionToken } from '@angular/core';
import { ILuTranslation } from '@lucca-front/ng/core';
import { Translations } from './translations';

export const LU_DATE_SELECT_INPUT_TRANSLATIONS = new InjectionToken('LuDateSelectInputtranslations', {
	factory: () => luDateSelectInputTranslations,
});

export interface ILuDateSelectInputLabel {
	placeholderDay: string;
	placeholderMonth: string;
	placeholderYear: string;
	formatDay: string;
	formatMonth: string;
	formatYear: string;
}

export const luDateSelectInputTranslations: ILuTranslation<ILuDateSelectInputLabel> = Translations;
