import { InjectionToken } from '@angular/core';
import { ILuTranslation } from '@lucca-front/ng/core';

export const LU_DURATION_PICKER_TRANSLATIONS = new InjectionToken('LuDurationPickerTranslations', {
	factory: () => luDurationPickerTranslations,
});

export interface LuDurationPickerLabel {
	hours: string;
	minutes: string;
	days: string;
	hoursShort: string;
	minutesShort: string;
	secondsShort: string;
	daysShort: string;
	increaseHours: string;
	decreaseHours: string;
	increaseMinutes: string;
	decreaseMinutes: string;
	increaseDays: string;
	decreaseDays: string;
}

export const luDurationPickerTranslations: ILuTranslation<LuDurationPickerLabel> = {
	en: {
		hours: 'hours',
		minutes: 'minutes',
		days: 'days',
		hoursShort: 'h',
		minutesShort: 'min',
		secondsShort: 's',
		daysShort: 'd',
		increaseHours: 'Increase hours',
		decreaseHours: 'Decrease hours',
		increaseMinutes: 'Increase minutes',
		decreaseMinutes: 'Decrease minutes',
		increaseDays: 'Increase days',
		decreaseDays: 'Decrease days',
	},
	fr: {
		hours: 'heures',
		minutes: 'minutes',
		days: 'jours',
		hoursShort: 'h',
		minutesShort: 'min',
		secondsShort: 's',
		daysShort: 'j',
		increaseHours: 'Augmenter les heures',
		decreaseHours: 'Diminuer les heures',
		increaseMinutes: 'Augmenter les minutes',
		decreaseMinutes: 'Diminuer les minutes',
		increaseDays: 'Augmenter les jours',
		decreaseDays: 'Diminuer les jours',
	},
};
