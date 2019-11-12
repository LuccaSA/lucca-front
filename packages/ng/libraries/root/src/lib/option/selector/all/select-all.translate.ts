import { ILuTranslation } from '../../../translate/index';

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
		deselect: 'Tout désélectionner',
	},
} as ILuTranslation<ILuOptionSelectAllLabel>;
