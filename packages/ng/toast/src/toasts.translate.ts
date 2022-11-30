import { InjectionToken } from '@angular/core';
import { ILuTranslation } from '@lucca-front/ng/core';

export const LU_TOAST_TRANSLATIONS = new InjectionToken('LuToastTranslations', {
	factory: () => luToastTranslations,
});

export interface ILuToastLabel {
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
