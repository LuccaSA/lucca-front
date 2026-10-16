import { InjectionToken } from '@angular/core';
import { LuTranslation } from '@lucca-front/ng/core';
import { Translations } from './translations';

export const LU_LOADING_TRANSLATIONS = new InjectionToken('LuLoadingTranslations', {
	factory: () => luLoadingTranslations,
});

export interface LuLoadingLabel {
	label: string;
}

export const luLoadingTranslations: LuTranslation<LuLoadingLabel> = Translations;
