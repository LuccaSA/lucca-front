import { InjectionToken } from '@angular/core';
import { LuPluralForms, LuTranslation } from '@lucca-front/ng/core';
import { Translations } from './translations';

export const LU_ESTABLISHMENT_SELECT_INPUT_TRANSLATIONS = new InjectionToken('LuEstablishmentSelectTranslations', {
	factory: () => luEstablishmentSelectInputTranslations,
});

export interface ILuEstablishmentSelectInputLabel {
	establishments: LuPluralForms;
}

export const luEstablishmentSelectInputTranslations: LuTranslation<ILuEstablishmentSelectInputLabel> = Translations;
