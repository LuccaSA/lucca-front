import { ILuTranslation } from '../../translate/index';

export interface ILuModalLabel {
	submit: string;
	cancel: string;
}
export abstract class ALuModalLabel {
	submit: string;
	cancel: string;
}

export const luModalTranslations = {
	en: {
		submit: 'Ok',
		cancel: 'Cancel',
	},
	fr: {
		submit: 'Ok',
		cancel: 'Annuler',
	},
} as ILuTranslation<ILuModalLabel>;
