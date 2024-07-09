import { InjectionToken } from '@angular/core';
import { LuTranslation } from '@lucca-front/ng/core';
import { Translations } from './translations';

export const LU_OPTION_SELECT_ALL_TRANSLATIONS = new InjectionToken('LuOptionSelectAllTranslations', {
	factory: () => luOptionSelectAllTranslations,
});

export interface ILuOptionSelectAllLabel {
	select: string;
	deselect: string;
}

export const luOptionSelectAllTranslations: LuTranslation<ILuOptionSelectAllLabel> = Translations;
