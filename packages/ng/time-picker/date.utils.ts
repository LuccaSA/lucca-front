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

export const getHoursPartFromIsoTime = (time: ISO8601Time): number => Number(time.split(':')[0]);

export const getMinutesPartFromIsoTime = (time: ISO8601Time): number => Number(time.split(':')[1]);
