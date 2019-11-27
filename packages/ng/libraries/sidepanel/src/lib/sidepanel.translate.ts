import { ILuTranslation } from '@lucca-front/ng/core';

export interface ILuSidepanelLabel {
	submit: string;
	cancel: string;
}
export abstract class ALuSidepanelLabel {
	submit: string;
	cancel: string;
}

export const luSidepanelTranslations = {
	en: {
		submit: 'Ok',
		cancel: 'Cancel',
	},
	fr: {
		submit: 'Ok',
		cancel: 'Annuler',
	},
} as ILuTranslation<ILuSidepanelLabel>;
