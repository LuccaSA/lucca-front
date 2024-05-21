import { Duration } from 'date-fns';
import { ISO8601Duration } from './date-primitives';
import { isNotNil } from './misc.utils';

export type NonNullableDateFnsDuration = {
	years: number;
	months: number;
	days: number;
	hours: number;
	minutes: number;
	seconds: number;
};

type DateFnsDuration = Duration;

// TODO memoize
export const isoDurationToDateFnsDuration = (isoDuration: ISO8601Duration): NonNullableDateFnsDuration => {
	const regex = /^(?<sign>-)?P(?:(?<years>-?\d+)Y)?(?:(?<months>-?\d+)M)?(?:(?<weeks>-?\d+)W)?(?:(?<days>-?\d+)D)?(?:T(?:(?<hours>-?\d+)H)?(?:(?<minutes>-?\d+)M)?(?:(?<seconds>-?\d+(?:\.\d+)?)S)?)?$/;
	const matches = regex.exec(isoDuration);

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

export const createDurationFromHoursAndMinutes = (hours: number, minutes: number): ISO8601Duration => {
	return `PT${hours}H${minutes}M`;
};
