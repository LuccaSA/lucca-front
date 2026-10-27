import { isNotNil } from '@lucca-front/ng/core';
import { Duration } from 'date-fns';
import { TimeRangePickerRange } from '../time-range-picker/time-range-picker';
import { ISO8601Duration, ISO8601Time } from './date-primitives';

export type NonNullableDateFnsDuration = {
	years: number;
	months: number;
	days: number;
	hours: number;
	minutes: number;
	seconds: number;
};

type DateFnsDuration = Duration;

export const MAX_TIME = '23:59:59';

export const DEFAULT_TIME_VALUE = '––:––:––';

// ISO 8601 allows a decimal fraction on duration components, e.g. `P0.5D` for half a day.
const ISO8601DurationRegExp =
	/^(?<sign>-)?P(?:(?<years>-?\d+)Y)?(?:(?<months>-?\d+)M)?(?:(?<weeks>-?\d+(?:\.\d+)?)W)?(?:(?<days>-?\d+(?:\.\d+)?)D)?(?:T(?:(?<hours>-?\d+(?:\.\d+)?)H)?(?:(?<minutes>-?\d+(?:\.\d+)?)M)?(?:(?<seconds>-?\d+(?:\.\d+)?)S)?)?$/;

// TODO memoize
export const isoDurationToDateFnsDuration = (isoDuration: ISO8601Duration): NonNullableDateFnsDuration => {
	const matches = ISO8601DurationRegExp.exec(isoDuration);

	const groups = matches?.groups;

	if (!groups) {
		throw new Error(`Invalid ISO 8601 duration: ${isoDuration}`);
	}

	const withSign = groups['sign'] === '-' ? -1 : 1;

	const result: NonNullableDateFnsDuration = {
		years: groups['years'] ? Number(groups['years']) : 0,
		months: groups['months'] ? Number(groups['months']) : 0,
		days: groups['days'] ? Number(groups['days']) : 0,
		hours: groups['hours'] ? Number(groups['hours']) : 0,
		minutes: groups['minutes'] ? Number(groups['minutes']) : 0,
		seconds: groups['seconds'] ? Number(groups['seconds']) : 0,
	};

	result.years *= withSign;
	result.months *= withSign;
	result.days *= withSign;
	result.hours *= withSign;
	result.minutes *= withSign;
	result.seconds *= withSign;

	return result;
};

export function isISO8601Duration(value: string): value is ISO8601Duration {
	return ISO8601DurationRegExp.test(value);
}

export const dateFnsDurationToSeconds = (durationFns: DateFnsDuration): number => {
	const { years, months } = durationFns;
	let { days, hours, minutes, seconds } = durationFns;

	if ((isNotNil(years) && years !== 0) || (isNotNil(months) && months !== 0)) {
		throw new Error('years and months are not supported');
	}

	days = days || 0;
	hours = hours || 0;
	minutes = minutes || 0;
	seconds = seconds || 0;

	return days * 24 * 60 * 60 + hours * 60 * 60 + minutes * 60 + seconds;
};

export const isoDurationToSeconds = (duration: ISO8601Duration): number => {
	const durationFns = isoDurationToDateFnsDuration(duration);

	return dateFnsDurationToSeconds(durationFns);
};

export const getHoursPartFromDuration = (duration: ISO8601Duration): number => {
	return Math.floor(isoDurationToSeconds(duration) / 3600);
};

export const getMinutesPartFromDuration = (duration: ISO8601Duration): number => {
	return Math.floor((isoDurationToSeconds(duration) % 3600) / 60);
};

export const getTotalSeconds = (time: ISO8601Time): number => {
	const [hours, minutes, seconds] = time.split(':').map(Number);
	return hours * 3600 + minutes * 60 + seconds;
};

export const createDurationFromHoursAndMinutes = (hours: number, minutes: number): ISO8601Duration => {
	return `PT${hours}H${minutes}M`;
};

/**
 * Durations expressed in days are handled internally in milli-days (1/1000 of a day) so that every
 * supported step (1, 0.5, 0.25, 0.125 and 0.1 day) stays an integer and no float drift creeps in.
 */
export const MILLI_DAYS_IN_DAY = 1000;

const SECONDS_IN_DAY = 24 * 60 * 60;

export const isoDurationToMilliDays = (duration: ISO8601Duration): number => {
	return Math.round((isoDurationToSeconds(duration) / SECONDS_IN_DAY) * MILLI_DAYS_IN_DAY);
};

export const createDurationFromMilliDays = (milliDays: number): ISO8601Duration => {
	return `P${milliDays / MILLI_DAYS_IN_DAY}D`;
};

/**
 * Number of decimals needed to display a value expressed with the given milli-day step,
 * e.g. 3 for 125 milli-days (0.125 day) and 0 for 1000 milli-days (1 day).
 */
export const getDecimalsFromMilliDays = (milliDays: number): number => {
	if (milliDays % 1000 === 0) {
		return 0;
	}
	if (milliDays % 100 === 0) {
		return 1;
	}
	if (milliDays % 10 === 0) {
		return 2;
	}
	return 3;
};

export const isValidTimeRangePicker = (time: TimeRangePickerRange): boolean => {
	if (isNotNil(time?.end) && isNotNil(time?.start)) {
		return true;
	}
	return false;
};

export const isEndTimeBeforeStartTime = (time: TimeRangePickerRange): boolean => {
	if (isNotNil(time?.end) && isNotNil(time?.start)) {
		return getTotalSeconds(time.end) < getTotalSeconds(time.start);
	}
	return false;
};
