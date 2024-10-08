import { InjectionToken } from '@angular/core';
import { LuTranslation } from '@lucca-front/ng/core';
import { Translations } from './translations';

export const LU_TIME_PICKER_TRANSLATIONS = new InjectionToken('LuTimePickerTranslations', {
	factory: () => luTimePickerTranslations,
});

export type TimePickerTranslations = {
	timePickerHours: string;
	timePickerTimeSeparator: string;
	timePickerMinutes: string;
};

export const luTimePickerTranslations: LuTranslation<TimePickerTranslations> = Translations;
