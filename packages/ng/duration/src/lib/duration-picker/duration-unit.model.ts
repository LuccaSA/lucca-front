export const durationUnits = ['day', 'hour'] as const;

export type LuDurationUnit = (typeof durationUnits)[number];
