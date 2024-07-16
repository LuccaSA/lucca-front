import { InjectionToken } from '@angular/core';
import { LuTranslation } from '@lucca-front/ng/core';
import { Translations } from './translations';

export const LU_TOAST_TRANSLATIONS = new InjectionToken('LuToastTranslations', {
	factory: () => luToastTranslations,
});

export interface ILuToastLabel {
	close: string;
}

export const luToastTranslations: LuTranslation<ILuToastLabel> = Translations;
