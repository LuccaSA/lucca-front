import { InjectionToken } from '@angular/core';
import { ILuTranslation } from '@lucca-front/ng/core';
import { Translations } from './translations';

export const LU_CORE_SELECT_TRANSLATIONS = new InjectionToken('LuCoreSelectTranslations', {
	factory: () => luCoreSelectTranslations,
});

export interface LuCoreSelectLabel {
	addOption: string;
}

export const luCoreSelectTranslations: ILuTranslation<LuCoreSelectLabel> = Translations;
