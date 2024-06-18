import { differenceInDays, differenceInHours, differenceInMinutes, differenceInMonths, differenceInSeconds, differenceInWeeks, differenceInYears } from 'date-fns';
import { Observable } from 'rxjs';
import { LuRelativeTime, LuRelativeTimeFormatUnit, luRelativeTimeFormatUnit } from './humanize.model';

const getDifferenceByUnit: Record<LuRelativeTimeFormatUnit, (date: number | Date, reference: number | Date) => number> = {
	second: differenceInSeconds,
	minute: differenceInMinutes,
	hour: differenceInHours,
	day: differenceInDays,
	week: differenceInWeeks,
	month: differenceInMonths,
	year: differenceInYears,
};

export function getRelativeTime(date: number | Date, reference: number | Date, allowedUnits: readonly LuRelativeTimeFormatUnit[] = luRelativeTimeFormatUnit): LuRelativeTime {
	if (!allowedUnits.length) {
		throw new Error('[getRelativeTime] Pass at least one unit');
	}

	for (let i = 0; i < allowedUnits.length; i++) {
		const unit = allowedUnits[i];
		const isLastUnit = i === allowedUnits.length - 1;

		if (isLastUnit) {
			return { unit, value: getDifferenceByUnit[unit](date, reference) };
		}

		const nextUnit = allowedUnits[i + 1];
		const diff = getDifferenceByUnit[nextUnit](date, reference);

		if (Math.abs(diff) < 1) {
			return { unit, value: getDifferenceByUnit[unit](date, reference) };
		}
	}

	// Should never happen as the for loop should always return
	throw new Error('[getRelativeTime] No unit found for the given date');
}

const nextRelativeTimeTickInMsByUnit: Record<LuRelativeTimeFormatUnit, number> = {
	second: 1_000,
	minute: 60_000,
	hour: 60 * 60_000,
	day: 24 * 60 * 60_000,
	week: 24 * 60 * 60_000,
	month: 24 * 60 * 60_000,
	year: 24 * 60 * 60_000,
};

const previousRelativeTimeUnitByUnit: Record<LuRelativeTimeFormatUnit, LuRelativeTimeFormatUnit | null> = {
	second: null,
	minute: 'second',
	hour: 'minute',
	day: 'hour',
	week: 'day',
	month: 'week',
	year: 'month',
};

export function relativeTimeTimer(date: Date | number, allowedUnits?: readonly LuRelativeTimeFormatUnit[]): Observable<LuRelativeTime> {
	return new Observable<LuRelativeTime>((subscriber) => {
		let timeoutId: ReturnType<typeof setTimeout> | null = null;
		const dateAsNumber = typeof date === 'number' ? date : date.getTime();

		function next() {
			const now = Date.now();
			const relativeTime = getRelativeTime(date, now, allowedUnits);
			subscriber.next(relativeTime);

			const unit =
				relativeTime.value === 1 && relativeTime.unit !== 'second'
					? // We a future date come closer, we need to switch to the previous unit
						// For example, if we are at 1 minutes, we should switch to second to avoid displaying '1 minute' during '1 minute' (we want to wait one second to display '59 seconds')
						previousRelativeTimeUnitByUnit[relativeTime.unit]
					: relativeTime.unit;

			const delta = now - dateAsNumber;
			const nextTick = nextRelativeTimeTickInMsByUnit[unit];

			// setTimeout is not an exact science, so we need to adjust the next tick to avoid drift over time
			const shift = Math.abs(delta) % nextTick;
			const nextWait = relativeTime.value !== 1 ? nextTick - shift : 1000;

			timeoutId = setTimeout(next, nextWait);
		}

		// Trigger the recursive loop
		next();

		return () => {
			if (timeoutId) {
				clearTimeout(timeoutId);
			}
		};
	});
}
