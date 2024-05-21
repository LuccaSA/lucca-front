import { InjectionToken } from '@angular/core';
import { ILuTranslation } from '../../core/translate';

export const LU_TIME_PICKER_TRANSLATIONS = new InjectionToken('LuTimePickerTranslations', {
	factory: () => luTimePickerTranslations,
});

export type TimePickerTranslations = {
	timePickerDescriptionAccessibility: string;
	timePickerHours: string;
	timePickerTimeSeparator: string;
	timePickerMinutes: string;
};

export const luTimePickerTranslations: ILuTranslation<TimePickerTranslations> = {
	en: {
		timePickerDescriptionAccessibility: '%%TODO%%',
		timePickerHours: '%%HEURES%%',
		timePickerTimeSeparator: 'h',
		timePickerMinutes: '%%MINUTES%%',
	},
	fr: {
		timePickerDescriptionAccessibility: '%%TODO%%',
		timePickerHours: '%%HEURES%%',
		timePickerTimeSeparator: 'h',
		timePickerMinutes: '%%MINUTES%%',
	},
};
