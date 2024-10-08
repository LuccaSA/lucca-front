import { InjectionToken } from '@angular/core';
import { LuTranslation } from '@lucca-front/ng/core';
import { Translations } from './translations';

export const LU_DIALOG_HEADER_TRANSLATIONS = new InjectionToken('LuDialogHeaderTranslations', {
	factory: () => luDialogHeaderTranslations,
});

export interface LuDialogHeaderTranslations {
	close: string;
}

export const luDialogHeaderTranslations: LuTranslation<LuDialogHeaderTranslations> = Translations;
