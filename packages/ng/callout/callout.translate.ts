import { InjectionToken } from '@angular/core';
import { ILuTranslation } from '@lucca-front/ng/core';
import { Translations } from './translations';

export const LU_CALLOUT_TRANSLATIONS = new InjectionToken('LuCalloutTranslations', {
	factory: () => luCalloutTranslations,
});

export interface LuCalloutLabel {
	close: string;
}

export const luCalloutTranslations: ILuTranslation<LuCalloutLabel> = Translations;
