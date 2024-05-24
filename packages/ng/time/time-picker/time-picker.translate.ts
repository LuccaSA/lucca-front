import { InjectionToken } from '@angular/core';
import { ILuTranslation } from '../../core/translate';

export const LU_TIME_PICKER_TRANSLATIONS = new InjectionToken('LuTimePickerTranslations', {
	factory: () => luTimePickerTranslations,
});

export type TimePickerTranslations = {
	timePickerHours: string;
	timePickerTimeSeparator: string;
	timePickerMinutes: string;
};

export const luTimePickerTranslations: ILuTranslation<TimePickerTranslations> = {
	en: {
		timePickerHours: 'hours',
		timePickerTimeSeparator: ':',
		timePickerMinutes: 'minutes',
	},
	fr: {
		timePickerHours: 'heures',
		timePickerTimeSeparator: ':',
		timePickerMinutes: 'minutes',
	},
};
