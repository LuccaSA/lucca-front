export const CALENDAR_MODE = ['day', 'week', 'month', 'year'] as const;
export type CalendarMode = (typeof CALENDAR_MODE)[number];
