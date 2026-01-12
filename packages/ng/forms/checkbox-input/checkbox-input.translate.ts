import { InjectionToken } from '@angular/core';
import { LuTranslation } from '@lucca-front/ng/core';
import { Translations } from './translations';

export interface CheckboxInputTranslations {
	yes: string;
	no: string;
	separator: string;
}

export const CHECKBOX_INPUT_TRANSLATIONS = new InjectionToken('CheckboxInputTranslations', {
	factory: () => Translations as LuTranslation<CheckboxInputTranslations>,
});
