import { InjectionToken } from '@angular/core';
import { LuTranslation } from '@lucca-front/ng/core';
import { Translations } from './translations';

export const LU_CORE_SELECT_LEGAL_UNIT_ESTABLISHMENT_TRANSLATIONS = new InjectionToken('LuCoreSelectLegalUnitEstablishmentTranslations', {
	factory: () => luCoreSelectLegalUnitEstablishmentTranslations,
});

export interface LuCoreSelectLegalUnitEstablishmentTranslations {
	/** Read out before the name of a selected legal unit, the icon that marks it being decorative. */
	legalUnit: string;

	/** Prefixed to a legal unit name on its chevron, so the control says what it acts on. */
	expand: string;
	collapse: string;
}

export const luCoreSelectLegalUnitEstablishmentTranslations: LuTranslation<LuCoreSelectLegalUnitEstablishmentTranslations> = Translations;
