import { InjectionToken } from '@angular/core';
import { LuTranslation } from '@lucca-front/ng/core';
import { Translations } from './translations';

export const LU_DATA_TABLE_TRANSLATIONS = new InjectionToken('LuDataTableTranslations', {
	factory: () => luDataTableTranslations,
});

export interface LuDataTableTranslations {
	move: string;
}

export const luDataTableTranslations: LuTranslation<LuDataTableTranslations> = Translations;
