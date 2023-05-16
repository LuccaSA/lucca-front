export const displayUnits = ['h', 'min', 's'] as const;

export type DisplayUnit = (typeof displayUnits)[number];
