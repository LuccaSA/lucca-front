import { InjectionToken } from '@angular/core';
import { ILuTranslation } from '@lucca-front/ng/core';

export const LU_OPTION_SELECT_ALL_TRANSLATIONS = new InjectionToken('LuOptionSelectAllTranslations', {
	factory: () => luOptionSelectAllTranslations,
});

export interface ILuOptionSelectAllLabel {
	select: string;
	deselect: string;
}

export const luOptionSelectAllTranslations: ILuTranslation<ILuOptionSelectAllLabel> = {
	en: {
		select: 'Select all',
		deselect: 'Deselect all',
	},
	fr: {
		select: 'Tout sélectionner',
		deselect: 'Tout Déselectionner',
	},
	de: {
		select: 'Alle auswählen',
		deselect: 'Alle abwählen',
	},
	pt: {
		select: 'Selecionar tudo',
		deselect: 'Desselecionar tudo',
	},
	es: {
		select: 'Seleccionar todo',
		deselect: 'Desmarcar todo',
	},
};
