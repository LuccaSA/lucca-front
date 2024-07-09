import { InjectionToken } from '@angular/core';
import { LuTranslation } from '@lucca-front/ng/core';
import { Translations } from './translations';

export const LU_MODAL_TRANSLATIONS = new InjectionToken('LuModalTranslations', {
	factory: () => luModalTranslations,
});

export interface ILuModalLabel {
	submit: string;
	cancel: string;
	close: string;
}

export const luModalTranslations: LuTranslation<ILuModalLabel> = Translations;
