import { ISO8601Time } from './date-primitives';

export const castToIsoTime = (str: string) => str as ISO8601Time;

export const convertStringToIsoTime = (time: string): ISO8601Time => {
	if (/^\d{1,2}:\d{2}:\d{2}$/.test(time)) {
		return castToIsoTime(time);
	}

	if (/^\d{1,2}:\d{2}$/.test(time)) {
		return castToIsoTime(`${time}:00`);
	}

	if (/^\d{1,2}h\d{2}$/.test(time)) {
		return convertStringToIsoTime(time.replace('h', ':'));
	}

	throw new Error(`Invalid time format: ${time}`);
};

export const createIsoTimeFromHoursAndMinutes = (hours: number, minutes: number, seconds: number = 0): ISO8601Time => {
	const hoursStr = hours.toString().padStart(2, '0');
	const minutesStr = minutes.toString().padStart(2, '0');
	const secondsStr = seconds.toString().padStart(2, '0');

	return `${hoursStr}:${minutesStr}:${secondsStr}`;
};

export const isoTimeToSeconds = (time: ISO8601Time): number => {
	return getHoursPartFromIsoTime(time) * 3600 + getMinutesPartFromIsoTime(time) * 60 + getSecondsPartFromIsoTime(time);
};

export const getHoursPartFromIsoTime = (time: ISO8601Time): number => Number(time.split(':')[0]) || 0;

export const getMinutesPartFromIsoTime = (time: ISO8601Time): number => Number(time.split(':')[1]) || 0;
export const getSecondsPartFromIsoTime = (time: ISO8601Time): number => Number(time.split(':')[2]) || 0;

export const getHoursDisplayPartFromIsoTime = (time: ISO8601Time, ampm = false): number | '––' => {
	const hours = time.split(':')[0];
	if (hours === '––') {
		return hours;
	}
	if (ampm) {
		// Most consistent impl is to create a date and ask date-fns
		return formatAMPM(Number(hours)).hours;
	}
	return Number(hours);
};

export const formatAMPM = (inputHours: number): { hours: number; suffix: 'AM' | 'PM' } => {
	let hours = inputHours;
	const suffix = hours >= 12 ? 'PM' : 'AM';
	hours = hours % 12;
	hours = hours ? hours : 12; // 0 should be 12
	return {
		hours,
		suffix,
	};
};

export const getMinutesDisplayPartFromIsoTime = (time: ISO8601Time): number | '––' => {
	const minutes = time.split(':')[1];
	if (minutes === '––') {
		return minutes;
	}
	return Number(minutes);
};
