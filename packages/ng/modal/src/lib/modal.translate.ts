import { ILuTranslation } from '@lucca-front/ng/core';

export interface ILuModalLabel {
	submit: string;
	cancel: string;
	close: string;
}
export abstract class ALuModalLabel {
	submit: string;
	cancel: string;
	close: string;
}

export const luModalTranslations: ILuTranslation<ILuModalLabel> = {
	en: {
		submit: 'Ok',
		cancel: 'Cancel',
		close: 'Close',
	},
	fr: {
		submit: 'Ok',
		cancel: 'Annuler',
		close: 'Fermer',
	},
	es: {
		submit: 'Ok',
		cancel: 'Cancelar',
		close: 'Cerrar',
	},
};
