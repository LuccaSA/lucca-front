<<<<<<< HEAD:packages/ng/modal/src/lib/modal.translate.ts
import { ILuTranslation } from '@lucca-front/ng/core';

export interface ILuModalLabel {
	submit: string;
	cancel: string;
}
export abstract class ALuModalLabel {
	submit: string;
	cancel: string;
}

export const luModalTranslations = {
	en: {
		submit: 'Ok',
		cancel: 'Cancel',
	},
	fr: {
		submit: 'Ok',
		cancel: 'Annuler',
	},
	es: {
		submit: 'Ok',
		cancel: 'Cancelar',
	}
} as ILuTranslation<ILuModalLabel>;
=======
import { ILuTranslation } from '@lucca-front/ng/core';

export interface ILuModalLabel {
	submit: string;
	cancel: string;
}
export abstract class ALuModalLabel {
	submit: string;
	cancel: string;
}

export const luModalTranslations = {
	en: {
		submit: 'Ok',
		cancel: 'Cancel',
	},
	fr: {
		submit: 'Ok',
		cancel: 'Annuler',
	},
	es: {
		submit: 'Ok',
		cancel: 'Cancelar',
	}
} as ILuTranslation<ILuModalLabel>;
>>>>>>> origin/master:packages/ng/libraries/modal/src/lib/modal.translate.ts
