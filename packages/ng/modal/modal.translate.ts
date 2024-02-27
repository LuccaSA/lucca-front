import { InjectionToken } from '@angular/core';
import { ILuTranslation } from '@lucca-front/ng/core';

export const LU_MODAL_TRANSLATIONS = new InjectionToken('LuModalTranslations', {
	factory: () => luModalTranslations,
});

export interface ILuModalLabel {
	submit: string;
	cancel: string;
	close: string;
}

export const luModalTranslations: ILuTranslation<ILuModalLabel> = {
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
	de: {
		submit: 'Ok',
		cancel: 'Abbrechen',
		close: 'Schließen',
	},
	es: {
		submit: 'Ok',
		cancel: 'Cancelar',
		close: 'Cerrar',
	},
	pt: {
		submit: 'Ok',
		cancel: 'Cancelar',
		close: 'Fechar',
	},
};
