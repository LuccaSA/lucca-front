import { InjectionToken } from '@angular/core';
import { ILuTranslation } from '@lucca-front/ng/core';

export const LU_ESTABLISHMENT_SELECT_INPUT_TRANSLATIONS = new InjectionToken('LuEstablishmentSelectTranslations', {
	factory: () => luEstablishmentSelectInputTranslations,
});

export interface ILuEstablishmentSelectInputLabel {
	establishments: string;
}

export const luEstablishmentSelectInputTranslations: ILuTranslation<ILuEstablishmentSelectInputLabel> = {
	en: {
		establishments: 'establishments',
	},
	fr: {
		establishments: 'établissements',
	},
	es: {
		establishments: 'establecimiento',
	},
};
