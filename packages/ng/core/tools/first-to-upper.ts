/**
 * Returns a new string with first character set to uppercase
 * @param input
 */
export function firstToUpper(input: string): string {
	return `${input[0].toUpperCase()}${input.slice(1)}`;
}
