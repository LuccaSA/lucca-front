import { ILuTranslation } from '@lucca-front/ng/core';

export interface ILuSidepanelLabel {
	submit: string;
	cancel: string;
	close: string;
}
export abstract class ALuSidepanelLabel {
	submit: string;
	cancel: string;
	close: string;
}

export const luSidepanelTranslations: ILuTranslation<ILuSidepanelLabel> = {
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
