import { LuDuration } from './duration.model';

const iso8601DurationRegex = /(-)?P(?:([.,\d]+)D)?(?:T(?:([.,\d]+)H)?(?:([.,\d]+)M)?(?:([.,\d]+)S)?)?/;

export function parseDuration(iso8601String: string): LuDuration {
	const matches = iso8601String.match(iso8601DurationRegex);
	if (isNull(matches)) {
		throw Error('Invalid format');
	}
	// const multiplier = inputValueMatches[1] === undefined ? 1 : -1;  USED FOR NEGATIVE VALUES (not provided)
	const days = isNotNull(matches[2]) ? parseInt(matches[2]) : 0;
	const hours = isNotNull(matches[3]) ? parseInt(matches[3]) : 0;
	const minutes = isNotNull(matches[4]) ? parseInt(matches[4]) : 0;
	const seconds = isNotNull(matches[5]) ? parseInt(matches[5]) : 0;
	return { days, hours, minutes, seconds };
}

export function toIsoString(duration: LuDuration): string {
	return (
		'P' +
		(duration.days > 0 ? duration.days.toString() + 'DT' : 'T') +
		(duration.hours > 0 ? duration.hours.toString() + 'H' : '') +
		(duration.minutes > 0 ? duration.minutes.toString() + 'M' : '') +
		(duration.seconds > 0 ? duration.seconds.toString() + 'S' : '')
	);
}

export function isoDurationToSeconds(iso8601String: string): number {
	const duration = parseDuration(iso8601String);
	return duration.days * 86400 + duration.hours * 3600 + duration.minutes * 60 + duration.seconds;
}

export function isNull<T>(input: T | null): input is null {
	return input === null || input === undefined;
}

export function isNotNull<T>(input: T): input is NonNullable<T> {
	return !isNull(input);
}
