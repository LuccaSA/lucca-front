export type DurationPickerStep = HourDurationPickerStep | DayDurationPickerStep;

export const hourDurationPickerSteps = ['PT1M', 'PT5M', 'PT10M', 'PT15M', 'PT30M', 'PT1H', 'PT2H'] as const;

export type HourDurationPickerStep = (typeof hourDurationPickerSteps)[number];

export function isHourDurationPickerStep(step: string): step is HourDurationPickerStep {
	return (hourDurationPickerSteps as ReadonlyArray<string>).includes(step);
}

export const dayDurationPickerSteps = ['PT3H', 'PT6H', 'PT12H', 'P1D'] as const;

export type DayDurationPickerStep = (typeof dayDurationPickerSteps)[number];

export function isDayDurationPickerStep(step: string): step is DayDurationPickerStep {
	return (dayDurationPickerSteps as ReadonlyArray<string>).includes(step);
}
