import { InjectionToken } from '@angular/core';
import { LuTranslation } from '@lucca-front/ng/core';
import { Translations } from './translations';

export const LU_PRIORITY_TRANSLATIONS = new InjectionToken('luPriorityTranslations', {
	factory: () => luPriorityTranslations,
});

export interface PriorityTranslate {
	low: string;
	medium: string;
	high: string;
}

export const luPriorityTranslations: LuTranslation<PriorityTranslate> = Translations;
