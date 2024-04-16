import { InjectionToken } from '@angular/core';
import { ILuTranslation } from '@lucca-front/ng/core';

export const LU_CORE_SELECT_TRANSLATIONS = new InjectionToken('LuCoreSelectTranslations', {
	factory: () => luCoreSelectTranslations,
});

export interface LuCoreSelectLabel {
	addOption: string;
}

export const luCoreSelectTranslations: ILuTranslation<LuCoreSelectLabel> = {
	en: {
		addOption: 'Add option',
	},
	fr: {
		addOption: 'Ajouter une option',
	},
	de: {
		addOption: 'Option hinzufügen',
	},
	es: {
		addOption: 'Agregar opción',
	},
	pt: {
		addOption: 'Adicionar opção',
	},
};
