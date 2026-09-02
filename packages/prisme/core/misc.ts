type Nil = null | undefined;

export const isNil = <T>(value: T | Nil): value is Nil => typeof value === 'undefined' || value === null;

export const isNotNil = <T>(value: T): value is NonNullable<T> => !isNil(value);

export function assertNotNil<T>(input: T, errorMessage = '[assertNotNil] Unexpected null or undefined value.'): asserts input is NonNullable<T> {
	if (isNil(input)) {
		throw new Error(errorMessage);
	}
}

export const isNilOrEmptyString = (str: string | Nil): str is Nil | '' => isNil(str) || str === '';

export const isNotNilOrEmptyString = (str: string | Nil): str is string => !isNilOrEmptyString(str);
