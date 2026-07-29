import { InjectionToken } from '@angular/core';
import { LuTranslation } from '@lucca-front/ng/core';
import { Translations } from './translations';

export const LU_BOX_TRANSLATIONS = new InjectionToken('LuBoxTranslations', {
	factory: () => luBoxTranslations,
});

export interface LuBoxLabel {
	close: string;
}

export const luBoxTranslations: LuTranslation<LuBoxLabel> = Translations;
