import { numberAttribute } from '@angular/core';

/**
 * Transforms a number or a string representation of a number into a number.
 * @template T The specific number literal type to narrow to.
 * @param value The value to transform, can be a number or a string representation of a number.
 * @returns The transformed number value.
 */
export function luNumberAttribute(value: number | `${number}`): number;
export function luNumberAttribute<T extends number>(value: T | `${T}`): T;
export function luNumberAttribute(value: number | `${number}`): number {
	return numberAttribute(value);
}

/**
 * Transforms a number, a string representation of a number, null or a string representation of null into a number or null.
 * @template T The specific number literal type to narrow to.
 * @param value The value to transform, can be a number, a string representation of a number, null or a string representation of null.
 * @returns The transformed number value or null.
 */
export function luNullableNumberAttribute(value: number | `${number}` | null | `${null}`): number | null;
export function luNullableNumberAttribute<T extends number>(value: T | `${T}` | null | `${null}`): T | null;
export function luNullableNumberAttribute(value: number | `${number}` | null | `${null}`): number | null {
	if (value === null || value === 'null') {
		return null;
	}

	return numberAttribute(value);
}

/**
 * Transforms a number, a string representation of a number, undefined or a string representation of undefined into a number or undefined.
 * @template T The specific number literal type to narrow to.
 * @param value The value to transform, can be a number, a string representation of a number, undefined or a string representation of undefined.
 * @returns The transformed number value or undefined.
 */
export function luOptionalNumberAttribute(value: number | `${number}` | undefined | `${undefined}`): number | undefined;
export function luOptionalNumberAttribute<T extends number>(value: T | `${T}` | undefined | `${undefined}`): T | undefined;
export function luOptionalNumberAttribute(value: number | `${number}` | undefined | `${undefined}`): number | undefined {
	if (value === undefined || value === 'undefined') {
		return undefined;
	}
	return numberAttribute(value);
}

/**
 * Transforms a number, a string representation of a number, null, a string representation of null, undefined or a string representation of undefined into a number, null or undefined.
 * @template T The specific number literal type to narrow to.
 * @param value The value to transform.
 * @returns The transformed number value, null or undefined.
 */
export function luOptionalNullableNumberAttribute(value: number | `${number}` | null | `${null}` | undefined | `${undefined}`): number | null | undefined;
export function luOptionalNullableNumberAttribute<T extends number>(value: T | `${T}` | null | `${null}` | undefined | `${undefined}`): T | null | undefined;
export function luOptionalNullableNumberAttribute(value: number | `${number}` | null | `${null}` | undefined | `${undefined}`): number | null | undefined {
	if (value === null || value === 'null') {
		return null;
	}
	if (value === undefined || value === 'undefined') {
		return undefined;
	}
	return numberAttribute(value);
}
