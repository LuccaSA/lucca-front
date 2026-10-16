import { InjectionToken } from '@angular/core';
import { LuTranslation } from '@lucca-front/ng/core';
import { Translations } from './translations';

export const LU_PRIORITY_LEVELS_TRANSLATIONS = new InjectionToken('luPriorityLevelsTranslations', {
	factory: () => luPriorityLevelsTranslations,
});

export interface PriorityLevelsTranslate {
	low: string;
	medium: string;
	high: string;
}

export const luPriorityLevelsTranslations: LuTranslation<PriorityLevelsTranslate> = Translations;
