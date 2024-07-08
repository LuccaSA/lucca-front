import { InjectionToken } from '@angular/core';
import { ILuTranslation } from '@lucca-front/ng/core';
import { Translations } from './translations';

export const LU_TOAST_TRANSLATIONS = new InjectionToken('LuToastTranslations', {
	factory: () => luToastTranslations,
});

export interface ILuToastLabel {
	close: string;
}

export const luToastTranslations: ILuTranslation<ILuToastLabel> = Translations;
