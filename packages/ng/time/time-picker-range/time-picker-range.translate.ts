import { InjectionToken } from '@angular/core';
import { LuTranslation } from '@lucca-front/ng/core';
import { Translations } from './translations';

export const LU_TIME_PICKER_RANGE_TRANSLATIONS = new InjectionToken('LuTimePickerRangeTranslations', {
	factory: () => luTimePickerRangeTranslations,
});

export type TimePickerRangeTranslations = {
	timePickerRangeStart: string;
	timePickerRangeEnd: string;
};

export const luTimePickerRangeTranslations: LuTranslation<TimePickerRangeTranslations> = Translations;
