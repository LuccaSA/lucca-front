import { ISO8601Duration } from '../core/date-primitives';

/**
 * Available DurationPickerComponent units
 */
export const DURATION_PICKER_UNIT = ['hoursMinutes', 'days'] as const;
export type DurationPickerUnit = (typeof DURATION_PICKER_UNIT)[number];

export type DurationChangeOrigin =
	| {
			source: 'input' | 'paste';
	  }
	| { source: 'control'; part: 'minutes' | 'hours' | 'days'; direction: 'up' | 'down' };

export type DurationChangeEvent = {
	previousValue: ISO8601Duration | null;
	value: ISO8601Duration;
} & DurationChangeOrigin;

export const DEFAULT_TIME_DECIMAL_PIPE_FORMAT = '2.0-0';

export const DEFAULT_MAX_HOURS_MINUTES: ISO8601Duration = 'PT99H';

export const DEFAULT_MAX_DAYS: ISO8601Duration = 'P99D';
