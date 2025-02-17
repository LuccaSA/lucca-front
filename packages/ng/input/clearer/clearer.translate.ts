import { InjectionToken } from '@angular/core';
import { LuTranslation } from '@lucca-front/ng/core';
import { Translations } from './translations';

export const LU_CLEARER_TRANSLATIONS = new InjectionToken('LuClearerTranslations', {
	factory: () => luClearerTranslations,
});

export interface LuClearerLabel {
	clear: string;
}

export const luClearerTranslations: LuTranslation<LuClearerLabel> = Translations;
