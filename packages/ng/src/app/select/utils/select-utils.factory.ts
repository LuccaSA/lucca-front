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

/**
 * Search an option in the list of options of the popover
 * @param optionsToFind the options to find
 * @returns an observable of the LuSelectOption find
 */
export function findArrayOption<T>(
	optionArray: LuSelectOption<T>[],
	optionsToFind: T[],
): LuSelectOption<T>[] {

	// Hash string method to avoid to many operations
	const hash = function(text: string): string {
		return text.split('').reduce(function(a: any, b: any) {
			// tslint:disable-next-line:no-bitwise
			a = (( a << 5) - a ) + b.charCodeAt(0);
			// tslint:disable-next-line:no-bitwise
			return a & a;
		}, 0);
	};

	const optionsInputHashCode = [];
	if (optionsToFind && optionsToFind.length > 0) {
		optionsToFind.forEach(option => {
			optionsInputHashCode.push(hash(JSON.stringify(option)));
		});
	}
	const filterArray: LuSelectOption<T>[] = [];
		optionArray.forEach(luOption => {
			const hashOfOption = hash(JSON.stringify(luOption.luOptionValue));
			if (optionsInputHashCode.indexOf(hashOfOption) !== -1) {
				filterArray.push(luOption);
			}
		});

	return filterArray;
}


