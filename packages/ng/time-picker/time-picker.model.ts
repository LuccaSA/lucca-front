import { ISO8601Time } from './date-primitives';

export type PickerControlDirection = 'up' | 'down';

export type TimeChangeEvent = {
	previousValue: ISO8601Time | null;
	value: ISO8601Time;
} & (
	| {
			source: 'input' | 'paste';
	  }
	| { source: 'control'; part: 'minutes' | 'hours'; direction: 'up' | 'down' }
);
export const DEFAULT_MIN_TIME: ISO8601Time = '00:00:00';
export const DEFAULT_MAX_TIME: ISO8601Time = '23:59:59';
export const DEFAULT_MAX_DURATION: ISO8601Time = '24:00:00';
export const DEFAULT_PICKER_STEP = 1;

export const DEFAULT_TIME_DECIMAL_PIPE_FORMAT = '2.0-0';
export const DEFAULT_DURATION_HOUR_DECIMAL_PIPE_FORMAT = '1.0-0';
