import { InjectionToken } from '@angular/core';
import { LuTranslation } from '@lucca-front/ng/core';
import { Translations } from './translations';

export const LU_CORE_SELECT_ESTABLISHMENT_TRANSLATIONS = new InjectionToken('LuCoreSelectEstablishmentTranslations', {
	factory: () => luCoreSelectEstablishmentTranslations,
});

export interface LuCoreSelectEstablishmentTranslations {
	myEstablishment: string;
}

export const luCoreSelectEstablishmentTranslations: LuTranslation<LuCoreSelectEstablishmentTranslations> = Translations;
