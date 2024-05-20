import { ISO8601Time } from '../core/date-primitives';

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

export const DEFAULT_TIME_DECIMAL_PIPE_FORMAT = '2.0-0';
