import { booleanAttribute } from '@angular/core';

/**
 * Transforms a boolean or a string representation of a boolean into a boolean.
 * @template T The specific boolean literal type to narrow to.
 * @param value The value to transform, can be a boolean or a string representation of a boolean.
 * @returns The transformed boolean value.
 */
export function luBooleanAttribute(value: boolean | `${boolean}`): boolean;
export function luBooleanAttribute<T extends boolean>(value: T | `${T}`): T;
export function luBooleanAttribute(value: boolean | `${boolean}`): boolean {
	return booleanAttribute(value);
}

/**
 * Transforms a boolean, a string representation of a boolean, null or a string representation of null into a boolean or null.
 * @template T The specific boolean literal type to narrow to.
 * @param value The value to transform, can be a boolean, a string representation of a boolean, null or a string representation of null.
 * @returns The transformed boolean value or null.
 */
export function luNullableBooleanAttribute(value: boolean | `${boolean}` | null | `${null}`): boolean | null;
export function luNullableBooleanAttribute<T extends boolean>(value: T | `${T}` | null | `${null}`): T | null;
export function luNullableBooleanAttribute(value: boolean | `${boolean}` | null | `${null}`): boolean | null {
	if (value === null || value === 'null') {
		return null;
	}

	return booleanAttribute(value);
}

/**
 * Transforms a boolean, a string representation of a boolean, undefined or a string representation of undefined into a boolean or undefined.
 * @template T The specific boolean literal type to narrow to.
 * @param value The value to transform, can be a boolean, a string representation of a boolean, undefined or a string representation of undefined.
 * @returns The transformed boolean value or undefined.
 */
export function luOptionalBooleanAttribute(value: boolean | `${boolean}` | undefined | `${undefined}`): boolean | undefined;
export function luOptionalBooleanAttribute<T extends boolean>(value: T | `${T}` | undefined | `${undefined}`): T | undefined;
export function luOptionalBooleanAttribute(value: boolean | `${boolean}` | undefined | `${undefined}`): boolean | undefined {
	if (value === undefined || value === 'undefined') {
		return undefined;
	}
	return booleanAttribute(value);
}

/**
 * Transforms a boolean, a string representation of a boolean, null, a string representation of null, undefined or a string representation of undefined into a boolean, null or undefined.
 * @template T The specific boolean literal type to narrow to.
 * @param value The value to transform.
 * @returns The transformed boolean value, null or undefined.
 */
export function luOptionalNullableBooleanAttribute(value: boolean | `${boolean}` | null | `${null}` | undefined | `${undefined}`): boolean | null | undefined;
export function luOptionalNullableBooleanAttribute<T extends boolean>(value: T | `${T}` | null | `${null}` | undefined | `${undefined}`): T | null | undefined;
export function luOptionalNullableBooleanAttribute(value: boolean | `${boolean}` | null | `${null}` | undefined | `${undefined}`): boolean | null | undefined {
	if (value === null || value === 'null') {
		return null;
	}
	if (value === undefined || value === 'undefined') {
		return undefined;
	}
	return booleanAttribute(value);
}
