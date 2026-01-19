type Nil = null | undefined;

export const isNil = <T>(value: T | Nil): value is Nil => typeof value === 'undefined' || value === null;

export const isNotNil = <T>(value: T): value is NonNullable<T> => !isNil(value);

export const isNilOrEmptyString = (str: string | Nil): str is Nil | '' => isNil(str) || str === '';

export const isNotNilOrEmptyString = (str: string | Nil): str is string => !isNilOrEmptyString(str);
