import { InjectionToken } from '@angular/core';
import { LuTranslation } from '@lucca-front/ng/core';
import { Translations } from './translations';

export const LU_FORM_LABEL_TRANSLATIONS = new InjectionToken('LuFormLabelTranslations', {
	factory: () => luFormLabelTranslations,
});

export interface LuFormLabelTranslations {
	counterAlt: { one: string; other: string };
	tooltipAlt: string;
}

export const luFormLabelTranslations: LuTranslation<LuFormLabelTranslations> = Translations;
