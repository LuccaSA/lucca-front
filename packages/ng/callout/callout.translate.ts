import { InjectionToken } from '@angular/core';
import { LuTranslation } from '@lucca-front/ng/core';
import { Translations } from './translations';

export const LU_CALLOUT_TRANSLATIONS = new InjectionToken('LuCalloutTranslations', {
	factory: () => luCalloutTranslations,
});

export interface LuCalloutLabel {
	close: string;
	warnings: string;
	errors: string;
	successes: string;
	information: string;
}

export const luCalloutTranslations: LuTranslation<LuCalloutLabel> = Translations;
