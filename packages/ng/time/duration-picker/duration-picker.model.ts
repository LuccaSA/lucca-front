import { ISO8601Duration, ISO8601Time } from '../core/date-primitives';

export type DurationChangeEvent = {
	previousValue: ISO8601Duration | null;
	value: ISO8601Duration;
} & (
	| {
			source: 'input' | 'paste';
	  }
	| { source: 'control'; part: 'minutes' | 'hours'; direction: 'up' | 'down' }
);

export const DEFAULT_TIME_DECIMAL_PIPE_FORMAT = '2.0-0';
