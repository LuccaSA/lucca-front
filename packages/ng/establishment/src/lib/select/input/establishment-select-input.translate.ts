import { ILuTranslation } from '@lucca-front/ng/core';

export interface ILuEstablishmentSelectInputLabel {
	establishments: string;
}
export abstract class ALuEstablishmentSelectInputLabel {
	establishments: string;
}

export const luEstablishmentSelectInputTranslations: ILuTranslation<ILuEstablishmentSelectInputLabel> = {
	en: {
		establishments: 'establishments',
	},
	fr: {
		establishments: 'établissements',
	},
	es: {
		establishments: 'establecimiento',
	},
};
