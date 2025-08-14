import { InjectionToken } from '@angular/core';
import { LuTranslation } from '@lucca-front/ng/core';
import { Translations } from './translations';

export const LU_OPTION_TRANSLATIONS = new InjectionToken('LuOptionTranslations', {
	factory: () => luOptionTranslations,
});

export interface OptionTranslate {
	onlyParent: string;
	onlyChildren: string;
}

export const luOptionTranslations: LuTranslation<OptionTranslate> = Translations;
