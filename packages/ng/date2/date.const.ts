export const DATE_FORMAT = {
	DATE: 'date',
	DATE_ISO: 'date-iso',
} as const;

export type DateFormat = (typeof DATE_FORMAT)[keyof typeof DATE_FORMAT];

export const DATE_ISO_FORMAT = 'yyyy-MM-dd';
