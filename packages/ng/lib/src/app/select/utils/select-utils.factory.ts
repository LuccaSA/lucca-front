import { LuSelectOption } from '../option';

/**
 * Check if two objects are equals (use JSON.Stringify)
 * @param oldItem the first item to compare
 * @param newItem the second item to compare
 * @returns true if the elements are equals.
 */
export function sameOption<T>(oldItem: T, newItem: T): boolean {
	if (oldItem === newItem) {
		return true;
	}
	if (!oldItem && !newItem) {
		return true;
	}
	if (!oldItem || !newItem) {
		return false;
	}
	return JSON.stringify(oldItem) === JSON.stringify(newItem);
}

/**
 * Search an option in the list of options of the popover
 * @param option the option to find
 * @returns an observable of the LuSelectOption find
 */
export function findOption<T>(
	optionArray: LuSelectOption<T>[],
	option: T,
): LuSelectOption<T> {
	return optionArray.find(selectOption =>
		sameOption(selectOption.luOptionValue, option),
	);
}
