import { ILuTranslation } from '@lucca-front/ng/core';

export interface ILuOptionSelectAllLabel {
	select: string;
	deselect: string;
}
export abstract class ALuOptionSelectAllLabel {
	select: string;
	deselect: string;
}

export const luOptionSelectAllTranslations = {
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
} as ILuTranslation<ILuOptionSelectAllLabel>;
