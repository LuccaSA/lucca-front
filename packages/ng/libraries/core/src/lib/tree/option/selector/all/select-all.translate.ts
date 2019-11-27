import { ILuTranslation } from '../../../../translate/index';

export interface ILuTreeOptionSelectAllLabel {
	select: string;
	deselect: string;
}
export abstract class ALuTreeOptionSelectAllLabel {
	select: string;
	deselect: string;
}

export const luTreeOptionSelectAllTranslations = {
	en: {
		select: 'Select all',
		deselect: 'Deselect all',
	},
	fr: {
		select: 'Tout sélectionner',
		deselect: 'Tout désélectionner',
	},
} as ILuTranslation<ILuTreeOptionSelectAllLabel>;
