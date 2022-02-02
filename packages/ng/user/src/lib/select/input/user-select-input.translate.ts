import { ILuTranslation } from '@lucca-front/ng/core';

export interface ILuUserSelectInputLabel {
	users: string;
	me: string;
}
export abstract class ALuUserSelectInputLabel {
	users: string;
	me: string;
}

export const luUserSelectInputTranslations = {
	en: {
		users: 'users',
		me: 'Me:',
	},
	fr: {
		users: 'utilisateurs',
		me: 'Moi :',
	},
	es: {
		users: 'empleados',
		me: 'Yo :',
	},
} as ILuTranslation<ILuUserSelectInputLabel>;
