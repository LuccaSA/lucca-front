import { InjectionToken } from '@angular/core';
import { LuTranslation } from '@lucca-front/ng/core';
import { Translations } from './translations';

export const LU_CORE_SELECT_LEGAL_UNITS_TRANSLATIONS = new InjectionToken('LuCoreSelectLegalUnitsTranslations', {
	factory: () => luCoreSelectLegalUnitsTranslations,
});

export interface LuCoreSelectLegalUnitsTranslations {
	includeArchivedLegalUnits: string;
}

export const luCoreSelectLegalUnitsTranslations: LuTranslation<LuCoreSelectLegalUnitsTranslations> = Translations;
