export const luDisplayUnits = ['h', 'min', 's'] as const;

export type LuDisplayUnit = (typeof luDisplayUnits)[number];
