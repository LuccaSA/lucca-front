export const luDurationUnits = ['day', 'hour'] as const;

export type LuDurationUnit = (typeof luDurationUnits)[number];
