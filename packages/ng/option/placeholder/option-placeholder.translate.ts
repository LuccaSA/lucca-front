import { InjectionToken } from '@angular/core';
import { ILuTranslation } from '@lucca-front/ng/core';
import { Translations } from './translations';

export const LU_OPTION_PLACEHOLDER_TRANSLATIONS = new InjectionToken('LuOptionPlaceholderTranslations', {
	factory: () => luOptionPlaceholderTranslations,
});

export interface ILuOptionPlaceholderLabel {
	placeholderDescription: string;
	placeholderAction: string;
}

export const luOptionPlaceholderTranslations: ILuTranslation<ILuOptionPlaceholderLabel> = Translations;
