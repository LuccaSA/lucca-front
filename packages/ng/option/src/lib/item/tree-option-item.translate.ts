import { ILuTranslation } from '@lucca-front/ng/core';

export interface ILuTreeOptionItemLabel {
	parentOnly: string;
	childrenOnly: string;
}
export abstract class ALuTreeOptionItemLabel {
	parentOnly: string;
	childrenOnly: string;
}

export const luTreeOptionItemTranslations: ILuTranslation<ILuTreeOptionItemLabel> = {
	en: {
		parentOnly: 'Parent only',
		childrenOnly: 'Children only',
	},
	fr: {
		parentOnly: 'Seulement le parent',
		childrenOnly: 'Seulement les enfants',
	},
};
