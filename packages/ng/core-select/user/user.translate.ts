import { InjectionToken } from '@angular/core';
import { LuTranslation } from '@lucca-front/ng/core';
import { Translations } from './translations';

export const LU_CORE_SELECT_USER_TRANSLATIONS = new InjectionToken('LuCoreSelectUserTranslations', {
	factory: () => luCoreSelectUserTranslations,
});

export interface LuCoreSelectUserTranslations {
	me: string;
}

export const luCoreSelectUserTranslations: LuTranslation<LuCoreSelectUserTranslations> = Translations;
