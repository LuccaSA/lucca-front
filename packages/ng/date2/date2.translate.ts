import { InjectionToken } from '@angular/core';
import { LuTranslation } from '@lucca-front/ng/core';
import { Translations } from './translations';

export const LU_DATE2_TRANSLATIONS = new InjectionToken('LuDate2Translations', {
	factory: () => luDate2Translations,
});

export interface Date2Translate {
	directionKeysTip: string;
	pickDate: string;
	previous: string;
	next: string;
	clear: string;
}

export const luDate2Translations: LuTranslation<Date2Translate> = Translations;
