import { InjectionToken } from '@angular/core';
import { LuTranslation } from '@lucca-front/ng/core';
import { Translations } from './translations';

export const LU_USER_SELECT_INPUT_TRANSLATIONS = new InjectionToken('LuUserSelectTranslations', {
	factory: () => luUserSelectInputTranslations,
});

export interface ILuUserSelectInputLabel {
	users: string;
	me: string;
}

export const luUserSelectInputTranslations: LuTranslation<ILuUserSelectInputLabel> = Translations;
