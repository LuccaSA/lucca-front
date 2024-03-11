export type LuDurationPickerStep = LuHourDurationPickerStep | LuDayDurationPickerStep;

export const luHourDurationPickerSteps = ['PT1M', 'PT5M', 'PT10M', 'PT15M', 'PT30M', 'PT1H', 'PT2H'] as const;

export type LuHourDurationPickerStep = (typeof luHourDurationPickerSteps)[number];

export function isHourDurationPickerStep(step: string): step is LuHourDurationPickerStep {
	return (luHourDurationPickerSteps as ReadonlyArray<string>).includes(step);
}

export const luDayDurationPickerSteps = ['PT3H', 'PT6H', 'PT12H', 'P1D'] as const;

export type LuDayDurationPickerStep = (typeof luDayDurationPickerSteps)[number];

export function isDayDurationPickerStep(step: string): step is LuDayDurationPickerStep {
	return (luDayDurationPickerSteps as ReadonlyArray<string>).includes(step);
}
