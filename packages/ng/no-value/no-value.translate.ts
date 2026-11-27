import { InjectionToken } from '@angular/core';
import { LuTranslation } from '@lucca-front/ng/core';
import { Translations } from './translations';

export const LU_NO_VALUE_TRANSLATIONS = new InjectionToken('LuNoValueTranslations', {
	factory: () => luNoValueTranslations,
});

export interface LuNoValueTranslations {
	noValue: string;
}

export const luNoValueTranslations: LuTranslation<LuNoValueTranslations> = Translations;
