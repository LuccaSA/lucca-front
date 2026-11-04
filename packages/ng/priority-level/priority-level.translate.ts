import { InjectionToken } from '@angular/core';
import { LuTranslation } from '@lucca-front/ng/core';
import { Translations } from './translations';

export const LU_PRIORITY_LEVEL_TRANSLATIONS = new InjectionToken('luPriorityLevelTranslations', {
	factory: () => luPriorityLevelTranslations,
});

export interface PriorityLevelTranslate {
	low: string;
	medium: string;
	high: string;
}

export const luPriorityLevelTranslations: LuTranslation<PriorityLevelTranslate> = Translations;
