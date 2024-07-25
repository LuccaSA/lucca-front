import { InjectionToken } from '@angular/core';
import { LuTranslation } from '@lucca-front/ng/core';

export const LU_PLG_PUSH_TRANSLATIONS = new InjectionToken('LuPLGPushTranslations', {
	factory: () => luPLGPushTranslations,
});

export interface LuPLGPushLabel {
	openNewTab: string;
}

export const luPLGPushTranslations: LuTranslation<LuPLGPushLabel> = {
	en: {
		openNewTab: 'Open in a new tab',
	},
	fr: {
		openNewTab: 'Ouvrir dans un nouvel onglet',
	},
	es: {
		openNewTab: 'Abrir en una pestaña nueva',
	},
	de: {
		openNewTab: 'In neuem Tab öffnen',
	},
};
