import { ILuTranslation } from '@lucca-front/ng/core';

export interface ILuToastLabel {
	close: string;
}
export abstract class ALuToastLabel {
	close: string;
}

export const luToastTranslations: ILuTranslation<ILuToastLabel> = {
	en: {
		close: 'Close',
	},
	fr: {
		close: 'Fermer',
	},
	es: {
		close: 'Cerrar',
	},
};
