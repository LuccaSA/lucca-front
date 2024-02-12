import { InjectionToken } from '@angular/core';
import { ILuTranslation } from '../../core/translate';

export const LU_DIALOG_HEADER_TRANSLATIONS = new InjectionToken('LuDialogHeaderTranslations', {
	factory: () => luDialogHeaderTranslations,
});

export interface LuDialogHeaderTranslations {
	close: string;
}

export const luDialogHeaderTranslations: ILuTranslation<LuDialogHeaderTranslations> = {
	en: {
		close: 'Close',
	},
	fr: {
		close: 'Fermer',
	},
	de: {
		close: 'Schließen',
	},
	es: {
		close: 'Cerrar',
	},
};
