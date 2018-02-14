import { LuSelectOption } from '../option/select-option.component';

export interface ISelectSearcher<T> {

	// setOptions(options: LuSelectOption<T>[]): void;
	// subscribe(filterCallback: (optionsFiltered: LuSelectOption<T>[]) => void);

	filter(clue: string, options: LuSelectOption<T>[]): LuSelectOption<T>[];
	hasFocus(): boolean;
}
