import { ILuTranslation } from '../../translate/index';

export interface ILuModalLabel {
	cancel: string;
}
export abstract class ALuModalLabel {
	cancel: string;
}

export const luModalTranslations = {
	en: {
		cancel: 'Cancel',
	},
	fr: {
		cancel: 'Annuler',
	},
} as ILuTranslation<ILuModalLabel>;
