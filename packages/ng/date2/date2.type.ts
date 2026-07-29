/**
 * Available DateComponent Types
 */

export const DATE2_CLEAR_BEHAVIOR = ['clear', 'reset'] as const;
export type Date2ClearBehavior = (typeof DATE2_CLEAR_BEHAVIOR)[number];

export const DATE_FORMAT_CONST = ['date', 'date-iso'] as const;

export const DATE_FORMAT = {
	DATE: 'date',
	DATE_ISO: 'date-iso',
} as const;

export type DateFormat = (typeof DATE_FORMAT)[keyof typeof DATE_FORMAT];

export const DATE_ISO_FORMAT = 'yyyy-MM-dd';
