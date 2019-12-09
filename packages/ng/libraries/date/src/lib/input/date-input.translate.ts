import { ILuTranslation } from '@lucca-front/ng/core';

export interface ILuDateInputLabel {
	placeholder: string;
}
export abstract class ALuDateInputLabel {
	placeholder: string;
}

export const luDateInputTranslations = {
	en: {
		placeholder: 'dd/mm/yyyy',
	},
	'en-US': {
		placeholder: 'mm/dd/yyyy',
	},
	fr: {
		placeholder: 'jj/mm/aaaa',
	},
} as ILuTranslation<ILuDateInputLabel>;
