/**
 * Extracts the values of an enum as a union type.
 *
 * @example
 * ```ts
 * enum ExampleEnum {
 *    A = 'a',
 *    B = 'b',
 * }
 *
 * type ExampleEnumValue = EnumValue<ExampleEnum>; // Same as 'a' | 'b'
 * ```
 */
export type EnumValue<T> = `${T[keyof T] & string}`;
