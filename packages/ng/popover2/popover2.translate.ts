import { InjectionToken } from '@angular/core';
import { LuTranslation } from '@lucca-front/ng/core';

export const LU_POPOVER2_TRANSLATIONS = new InjectionToken('LuPopover2Translations', {
	factory: () => luPopover2Translations,
});

export interface LuCalloutLabel {
	screenReaderDescription: string;
}

export const luPopover2Translations: LuTranslation<LuCalloutLabel> = {
	en: {
		screenReaderDescription: '(Tab key to enter panel.)',
	},
	fr: {
		screenReaderDescription: '(Touche de tabulation pour entrer dans le panneau.)',
	},
	es: {
		screenReaderDescription: '(Tabulador para entrar en el panel.)',
	},
	de: {
		screenReaderDescription: '(Tabulatortaste, um in das Panel zu gelangen.)',
	},
};
