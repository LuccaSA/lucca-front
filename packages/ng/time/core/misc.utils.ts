export const isNil = <T>(value: T | null | undefined): value is null | undefined => typeof value === 'undefined' || value === null;

export const isNotNil = <T>(value: T): value is NonNullable<T> => !isNil(value);

export type PickerControlDirection = 'up' | 'down';
