import { LuSelectOption } from '../option/index';

export interface ISelectSearcher<T> {
	/**
	 * Filter the options passed in parameters with the clue as search element
	 * @param clue : the key to search
	 * @param options : the options to filtered
	 */
	filter(clue: string, options: LuSelectOption<T>[]): LuSelectOption<T>[];
}
