import { InjectionToken } from '@angular/core';
import { LuTranslation } from '@lucca-front/ng/core';
import { Translations } from './translations';

export const LU_CLEAR_TRANSLATIONS = new InjectionToken('LuClearTranslations', {
	factory: () => luClearTranslations,
});

export interface LuClearLabel {
	clear: string;
}

export const luClearTranslations: LuTranslation<LuClearLabel> = Translations;
