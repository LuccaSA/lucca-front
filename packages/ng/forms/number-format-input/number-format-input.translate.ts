import { InjectionToken } from '@angular/core';
import { LuTranslation } from '@lucca-front/ng/core';
import { Translations } from './translations';

export const LU_NUMBERFORMATFIELD_TRANSLATIONS = new InjectionToken('LuNumberFormatFieldTranslations', {
	factory: () => luNumberFormatFieldTranslations,
});

export interface LuNumberFormatFieldLabel {
	clear: string;
}

export const luNumberFormatFieldTranslations: LuTranslation<LuNumberFormatFieldLabel> = Translations;
