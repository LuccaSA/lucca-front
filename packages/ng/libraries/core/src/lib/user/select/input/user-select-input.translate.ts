import { ILuTranslation } from '../../../translate/index';

export interface ILuUserSelectInputLabel {
	users: string;
}
export abstract class ALuUserSelectInputLabel {
	users: string;
}

export const luUserSelectInputTranslations = {
	en: {
		users: 'users',
	},
	fr: {
		users: 'utilisateurs',
	},
} as ILuTranslation<ILuUserSelectInputLabel>;
