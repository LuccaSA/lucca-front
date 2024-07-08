import { InjectionToken } from '@angular/core';
import { ILuTranslation } from '../../core/translate';
import { Translations } from './translations';

export const LU_DURATION_PICKER_TRANSLATIONS = new InjectionToken('LuDurationPickerTranslations', {
	factory: () => luDurationPickerTranslations,
});

export type DurationPickerTranslations = {
	timePickerHours: string;
	timePickerTimeSeparator: string;
	timePickerMinutes: string;
};

export const luDurationPickerTranslations: ILuTranslation<DurationPickerTranslations> = Translations;
