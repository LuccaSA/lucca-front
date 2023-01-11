import { InjectionToken } from '@angular/core';
import { ILuTranslation } from '@lucca-front/ng/core';

export const LU_SIDEPANEL_TRANSLATIONS = new InjectionToken('LuSidepanelTranslations', {
	factory: () => luSidepanelTranslations,
});

export interface ILuSidepanelLabel {
	submit: string;
	cancel: string;
	close: string;
}

export const luSidepanelTranslations: ILuTranslation<ILuSidepanelLabel> = {
	en: {
		submit: 'Ok',
		cancel: 'Cancel',
		close: 'Close',
	},
	fr: {
		submit: 'Ok',
		cancel: 'Annuler',
		close: 'Fermer',
	},
	es: {
		submit: 'Ok',
		cancel: 'Cancelar',
		close: 'Cerrar',
	},
};
