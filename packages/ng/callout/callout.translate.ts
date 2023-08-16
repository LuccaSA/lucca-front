import { InjectionToken } from '@angular/core';
import { ILuTranslation } from '@lucca-front/ng/core';

export const LU_CALLOUT_TRANSLATIONS = new InjectionToken('LuCalloutTranslations', {
	factory: () => luCalloutTranslations,
});

export interface LuCalloutLabel {
	close: string;
}

export const luCalloutTranslations: ILuTranslation<LuCalloutLabel> = {
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
