import { InjectionToken } from '@angular/core';
import { ILuTranslation } from '@lucca-front/ng/core';

export const LU_USER_SEARCHER_TRANSLATIONS = new InjectionToken('LuUserSearcherTranslations', {
	factory: () => luUserSearcherTranslations,
});

export interface ILuUserSearcherLabel {
	includeFormerEmployees: string;
}

export const luUserSearcherTranslations: ILuTranslation<ILuUserSearcherLabel> = {
	en: {
		includeFormerEmployees: 'Include former employees',
	},
	fr: {
		includeFormerEmployees: 'Inclure les salariés partis',
	},
	es: {
		includeFormerEmployees: 'Incluir a los antiguos empleados',
	},
};
