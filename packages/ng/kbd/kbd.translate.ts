import { InjectionToken } from '@angular/core';
import { LuTranslation } from '@lucca-front/ng/core';
import { Translations } from './translations';

export const LU_KBD_TRANSLATIONS = new InjectionToken('LuKbdTranslations', {
	factory: () => luKbdTranslations,
});

export interface LuKbdTranslations {
	alt: string;
	option: string;
	control: string;
	meta: string;
	command: string;
	shift: string;
	tab: string;
	space: string;
	enter: string;
	escape: string;
	backspace: string;
	delete: string;
	home: string;
	end: string;
	pageUp: string;
	pageDown: string;
	arrowUp: string;
	arrowDown: string;
	arrowLeft: string;
	arrowRight: string;
}

export const luKbdTranslations: LuTranslation<LuKbdTranslations> = Translations;
