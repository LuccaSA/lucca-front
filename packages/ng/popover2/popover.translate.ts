import { InjectionToken } from '@angular/core';
import { ILuTranslation } from '@lucca-front/ng/core';

export const LU_POPOVER2_TRANSLATIONS = new InjectionToken('LuPopover2Translations', {
	factory: () => luPopoverTranslations,
});

export interface ILuPopover2Label {
	close: string;
}

export const luPopoverTranslations: ILuTranslation<ILuPopover2Label> = {
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
	pt: {
		close: 'Fechar',
	},
};
