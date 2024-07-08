import { InjectionToken } from '@angular/core';
import { ILuTranslation } from '@lucca-front/ng/core';
import { Translations } from './translations';

export const LU_MODAL_TRANSLATIONS = new InjectionToken('LuModalTranslations', {
	factory: () => luModalTranslations,
});

export interface ILuModalLabel {
	submit: string;
	cancel: string;
	close: string;
}

export const luModalTranslations: ILuTranslation<ILuModalLabel> = Translations;
