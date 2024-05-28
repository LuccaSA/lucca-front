export const luRelativeTimeFormatUnit = ['second', 'minute', 'hour', 'day', 'week', 'month', 'year'] as const;
export type LuRelativeTimeFormatUnit = (typeof luRelativeTimeFormatUnit)[number];

export interface LuRelativeTime {
	/**
	 * The relevant unit for the relative time.
	 */
	unit: LuRelativeTimeFormatUnit;
	/**
	 * The integer value of the relative time.
	 * Negative values are used for past dates.
	 */
	value: number;
}
