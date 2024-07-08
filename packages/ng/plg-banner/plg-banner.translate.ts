import { InjectionToken } from '@angular/core';
import { ILuTranslation } from '@lucca-front/ng/core';

export const LU_PLG_BANNER_TRANSLATIONS = new InjectionToken('LuPLGBannerTranslations', {
	factory: () => luPLGBannerTranslations,
});

export interface LuPLGBannerLabel {
	openNewTab: string;
}

export const luPLGBannerTranslations: ILuTranslation<LuPLGBannerLabel> = {
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
