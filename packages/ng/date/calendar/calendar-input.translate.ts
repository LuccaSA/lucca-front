import { InjectionToken } from '@angular/core';
import { LuTranslation } from '@lucca-front/ng/core';
import { Translations } from './translations';

export const LU_CALENDARINPUT_TRANSLATIONS = new InjectionToken('LuCalendarInputTranslations', {
	factory: () => luCalendarInputTranslations,
});

export interface LuCalendarInputLabel {
	previous: string;
	next: string;
}

export const luCalendarInputTranslations: LuTranslation<LuCalendarInputLabel> = Translations;
