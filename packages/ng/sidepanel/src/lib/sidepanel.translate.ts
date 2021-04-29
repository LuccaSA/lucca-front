<<<<<<< HEAD:packages/ng/sidepanel/src/lib/sidepanel.translate.ts
import { ILuTranslation } from '@lucca-front/ng/core';

export interface ILuSidepanelLabel {
	submit: string;
	cancel: string;
}
export abstract class ALuSidepanelLabel {
	submit: string;
	cancel: string;
}

export const luSidepanelTranslations = {
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
} as ILuTranslation<ILuSidepanelLabel>;
=======
import { ILuTranslation } from '@lucca-front/ng/core';

export interface ILuSidepanelLabel {
	submit: string;
	cancel: string;
}
export abstract class ALuSidepanelLabel {
	submit: string;
	cancel: string;
}

export const luSidepanelTranslations = {
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
} as ILuTranslation<ILuSidepanelLabel>;
>>>>>>> origin/master:packages/ng/libraries/sidepanel/src/lib/sidepanel.translate.ts
