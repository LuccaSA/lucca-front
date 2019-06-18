import { ILuTranslation } from '../../../translate/index';

export interface ILuTreeOptionItemLabel {
	parentOnly: string;
	childrenOnly: string;
}
export abstract class ALuTreeOptionItemLabel {
	parentOnly: string;
	childrenOnly: string;
}

export const luTreeOptionItemTranslations = {
	en: {
		parentOnly: 'Parent only',
		childrenOnly: 'Children only',
	},
	fr: {
		parentOnly: 'seulement le parent',
		childrenOnly: 'Seulement les enfants',
	},
} as ILuTranslation<ILuTreeOptionItemLabel>;
