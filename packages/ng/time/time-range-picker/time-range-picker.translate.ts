import { InjectionToken } from '@angular/core';
import { LuTranslation } from '@lucca-front/ng/core';
import { Translations } from './translations';

export const LU_TIME_RANGE_PICKER_TRANSLATIONS = new InjectionToken('LuTimeRangePickerTranslations', {
	factory: () => luTimeRangePickerTranslations,
});

export type TimeRangePickerTranslations = {
	timeRangePickerStart: string;
	timeRangePickerEnd: string;
	timeRangePickerFrom: string;
	timeRangePickerAt: string;
};

export const luTimeRangePickerTranslations: LuTranslation<TimeRangePickerTranslations> = Translations;
